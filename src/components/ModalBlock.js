import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Modal, Button } from 'react-bootstrap';

import { Context } from '..';
import { deleteNote } from '../http/noteAPI';
import { deleteAccount } from '../http/userAPI';

const ModalBlock = observer ( () => {

    const {alert} = useContext(Context)
    const {note} = useContext(Context)
    const {user} = useContext(Context)
  
    const handleClose = () => alert.setModalVisible(false);

    const onRemove = async () => {
        switch (alert.modalType) {
            case 'note':
                await deleteNote(alert.modalId)
                note.removeNote(alert.modalId)
                alert.setModalVisible(false)
                break;
            case 'user':
                await deleteAccount(alert.modalId)
                user.deleteAccount(alert.modalId)
                alert.setModalVisible(false)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Modal show={alert.modalVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{alert.modalText || "Удаляем, да?"}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Еще подумаю
                    </Button>
                    <Button variant="primary" onClick={onRemove}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ModalBlock;