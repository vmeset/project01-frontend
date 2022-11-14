import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Form} from 'react-bootstrap'

import { Context } from '..';
import { createNote } from '../http/noteAPI';

const Forma = observer ( () => {

    const {pathname} = useLocation()
    const [title, setTitle] = useState('')

    const {user} = useContext(Context)
    const {note} = useContext(Context)
    const {alert} = useContext(Context)

    const click = event => {
        event.preventDefault()
        if (title.trim()) {
            try {
                const newNote = {
                    title,
                    author: user.user.username,
                    type: pathname.slice(1) === "" ? "todo" : pathname.slice(1)
                }
                createNote(newNote).then(res => {
                    note.addNote(res.data)
                }).then(() => {
                    alert.showAlert("Заметка успешно создана", "success")
                    setTimeout(() => alert.hideAlert(), 2000);
                })
            } catch(e) {
                alert.showAlert(e.message, "danger")
            }
            setTitle('')
        } else {
            alert.showAlert('Введите название заметки', "warning")
        }
    }

    return (
        <>
            {pathname === "/done" 
                ? <></> 
                : <Form className="mt-2" onSubmit={click}>
                    <Form.Group 
                        className="mb-3" 
                    >
                        <Form.Control placeholder="Добавь новую заметку"
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            }
        </>
    );
});

export default Forma;