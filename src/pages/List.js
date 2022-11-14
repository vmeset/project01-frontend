import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';

import { Container } from 'react-bootstrap';

import { Context } from '..';
import { fetchNotes } from '../http/noteAPI';
import Forma from '../components/Forma'
import SortBlock from '../components/SortBlock';

const List = observer ( () => {

    const {note} = useContext(Context)
    const {user} = useContext(Context)
    const {pathname} = useLocation()

    useEffect(() => {
        fetchNotes(user.user.username).then(data => {
            note.setNotes(data)
        })
    }, [])

    let filterNotes = []
    let listTitle = "Список задач"

    switch(pathname.slice(1)) {
        case 'done':
            filterNotes = note.notes.filter(note => note.isCompleted)
            listTitle = "Выполненные задачи"
            break;
        case 'todo':
            filterNotes = note.notes.filter(note => note.type === 'todo' && note.isCompleted === false)
            listTitle = "Поставленные задачи"
            break;
        case '':
            filterNotes = note.notes.filter(note => note.type === 'todo' && note.isCompleted === false)
            listTitle = "Поставленные задачи"
            break;
        case 'buy':
            filterNotes = note.notes.filter(note => note.type === 'buy' && note.isCompleted === false)
            listTitle = "Покупки"
            break;
        default:
            filterNotes = note.notes
    }

    // useEffect(() => {
    //     fetchDevices(null, null, 1, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [device.page, device.selectedType, device.selectedBrand,])

    // useEffect(() => {
    //     check().then(data => {
    //       if(data) {
    //         user.setIsAuth(true)
    //         user.setUser(data)
    //       }
    //     }).finally(() => setIsLoading(false))
    //   }, [])

    return (
        <Container>
            <h4>
                {listTitle}
            </h4>
            <Forma />
            {/* <Button onClick={onSort}>
                butt
            </Button> */}
            <SortBlock notes={filterNotes} />
            {/* <ListGroup>
                {filterNotes.map(note => <Note key={note._id} notka={note} />)}
            </ListGroup> */}
        </Container>
    );
});

export default List;