import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import {Context} from '..'
import Account from '../components/Account';
import {fetchAccounts} from '../http/userAPI'

const Admin = observer( () => {

    const {user} = useContext(Context)

    useEffect(() => {
        fetchAccounts().then(data => {
            user.setAccounts(data.filter(account => account.username !== user.user.username))
        })
    }, [])
    
    return (
        <Container>
            <ListGroup>
                Список пользователей
                {user.accounts.map(acc => {
                    return <Account key={acc._id} account={acc}/>
                    })
                }
            </ListGroup>
        </Container>
    );
});

export default Admin;