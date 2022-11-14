import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import * as moment from "moment";

import { Context } from '..';
import { updateNote } from '../http/noteAPI';
import { NOTE_ROUTE } from '../utils/consts';

const Note = observer( ({notka}) => {

    const navigate = useNavigate()
    const {alert} = useContext(Context)

    const showModal = () => {
        alert.showModal('note', `Удалить заметку '${notka.title}'`, notka._id)
    }

    const onComplete = async () => {
        notka.isCompleted = !notka.isCompleted
        await updateNote(notka)
    }

    const formatDate = (date) => {
        return (
            moment(date).format("h:mm, DD.MM.YYYY")
        )
    }

    return (
        <ListGroup.Item 
            style={{cursor: "pointer"}}
        >
            <Row className='justify-content-between'>
                <Col xs={4}
                    onClick={() => navigate(NOTE_ROUTE + '/' + notka._id)}
                    className='align-bottom'
                >
                    {notka.title}
                </Col>
                <Col xs="auto"
                >
                    <small style={{fontSize: '12px'}} className='d-none d-sm-inline'>
                        {formatDate(notka.date)}
                    </small>
                    <Button
                        variant="outline-success"
                        onClick={() => onComplete(notka._id)}
                        className='ms-3 d-md-inline'
                    >
                        {notka.isCompleted ? `↩` : '✓'}
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={showModal}
                        className='ms-3 d-md-inline'
                    >
                        &times;
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
});

export default Note;