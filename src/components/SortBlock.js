import { observer } from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import { Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Note from '../components/Note';

const SortBlock = observer( ({notes}) => {

    const [searchVal, setSearchVal] = useState("")
    const [sort, setSort] = useState('asc')
    const [usNotes, setUsNotes] = useState([])

    useEffect(() => {
        setUsNotes(notes)
        // eslint-disable-next-line
    }, [notes])

    const onSort = (type) => {
        const copyNotes = notes.concat()
        const sortType = sort === 'asc' ? 'desc' : 'asc'
        const orderedNotes = _.orderBy(copyNotes, type, sortType)
        setSort(sortType)
        setUsNotes(orderedNotes)
    }

    return (
        <ListGroup>
            <Row className="justify-content-between">
                <Col xs lg={4} className='mb-3 pt-1'>
                    Сортировка
                    <Button variant={'outline-dark'}
                        className='ms-2 btn-sm'
                        onClick={() => {
                            onSort("title")
                        }}
                    >
                        по имени
                    </Button>
                    <Button variant={'outline-dark'}
                        className='ms-2 btn-sm'
                        onClick={() => {
                            onSort("date")
                        }}
                    >
                        по дате
                    </Button>
                </Col>
                <Col sm="auto"  className='mb-3'>
                    <Form.Control placeholder="поиск"
                        onChange={(e) => (setSearchVal(e.target.value))} 
                    />
                </Col>
            </Row>
            <TransitionGroup className='note-list'>
                {usNotes.filter(val => {
                    if (searchVal === "") {
                        return val
                    } else if (val.title.toLowerCase().includes(searchVal.toLowerCase())) {
                        return val
                    }
                }).map(note => (
                    <CSSTransition 
                        classNames={'note'} 
                        key={note._id}
                        timeout={1000}
                    >  
                        <Note notka={note} />
                    </CSSTransition>)
                )}
            </TransitionGroup>
        </ListGroup>
    );
});

export default SortBlock;