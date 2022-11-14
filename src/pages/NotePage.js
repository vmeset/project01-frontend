import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const NotePage = observer ( () => {
    
    const {note} = useContext(Context)
    const location = useLocation()

    const noteId = location.pathname.slice(6)
    
    const actualNote = note.notes.find(note => note._id === noteId)

    return (
        <Container>
            {actualNote.title}
        </Container>
    );
});

export default NotePage;