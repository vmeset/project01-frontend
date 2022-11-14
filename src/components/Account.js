import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { ListGroup, Row, Col, ToggleButton, Button } from 'react-bootstrap';
import {Context} from '..'
import { updateRole } from '../http/userAPI';

const Account = observer( ({account}) => {

    const {user} = useContext(Context)
    const {alert} = useContext(Context)

    const click = async (val) => {
        account.role = val
        await updateRole(account).then(() => user.toggleRole(account._id, val))
    }

    const removeAccount = () => {
        alert.showModal('user', `Удалить пользователя ${account.username}`, account._id)
    }

    // const onComplete = async () => {
    //     notka.isCompleted = !notka.isCompleted
    //     await updateNote(notka)
    // }

    return (
        <ListGroup.Item
            variant={account.role === 'ADMIN' ? 'danger' : 'success'}
        >
            <Row className='justify-content-between'>
                <Col>
                    {account.username}
                </Col>
                <Col xs="auto">
                    <ToggleButton
                        type="radio"
                        variant={account.role === 'USER' ? 'success' : 'outline-success'}
                        value={'USER'}
                        checked={account.role === 'USER'}
                        onClick={() => click('USER')}
                        className='me-1'
                    >
                        USER
                    </ToggleButton>
                    <ToggleButton
                        type="radio"
                        variant={account.role === 'ADMIN' ? 'danger' : 'outline-danger'}
                        value={'ADMIN'}
                        checked={account.role === 'ADMIN'}
                        onClick={() => click('ADMIN')}
                        className='me-1'
                    >
                        ADMIN
                    </ToggleButton>
                    <Button 
                        variant='dark'
                        onClick={() => removeAccount()}
                    >
                        Удалить <small className='d-none d-sm-inline'>пользователя</small>
                    </Button>
                </Col>
            </Row>
            
        </ListGroup.Item>
    );
});

export default Account;