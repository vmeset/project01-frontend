import React, { useContext, useState } from 'react';
import {useNavigate, NavLink} from 'react-router-dom'
import { Card, Container, Form, Button, Row } from 'react-bootstrap';
import { login, registration } from '../http/userAPI';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TO_DO_ROUTE} from '../utils/consts'
import {observer} from "mobx-react-lite";
import { Context } from '..';
import { useLocation } from 'react-router-dom';


const Auth = observer( () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    // const isLogin = location.pathname === LOGIN_ROUTE

    const {user} = useContext(Context)
    const {alert} = useContext(Context)

    const click = async () => {
        try {
            if (location.pathname === LOGIN_ROUTE) {
                    await login(username, password).then(data => {
                    user.setUser(data)
                    user.setIsAuth(true)
                    navigate(TO_DO_ROUTE)
                })
            } else {
                password === passwordConfirm ?
                    await registration(username, password).then(data => {
                    alert.showAlert(data, 'success')
                }) 
                    : alert.showAlert("пароли не совпадают", 'warning')
            }
        } catch (e) {
            console.log(e.response.data.message)
            // alert.showAlert(e.response.data, 'warning')
        }
        // const data = await login(username, password)
        
    }

    const clickGuest = async () => {
        try {
            await login('guest', 'guest').then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                navigate(TO_DO_ROUTE)
            })
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 400}}
                className="border-0 p-5"
            >
                <h2 className="m-auto my-2">
                    {location.pathname === LOGIN_ROUTE ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="my-2"
                        placeholder="Введите логин"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    { location.pathname === REGISTRATION_ROUTE ?
                    <Form.Control
                        placeholder="Подтвердите пароль"
                        type="password"
                        value={passwordConfirm}
                        onChange={e => {setPasswordConfirm(e.target.value)}}
                    /> 
                    : <></>
                    }
                    <Row className="d-flex justify-content-between my-3">
                        <div>
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                                className='w-100 mb-3'
                            >
                                {location.pathname === LOGIN_ROUTE ? "Войти" : "Регистрация"}
                            </Button>
                            {location.pathname === LOGIN_ROUTE 
                                ? 
                                <Button
                                    variant={"outline-info"}
                                    onClick={clickGuest}
                                    className='w-100 mb-3'
                                >
                                    Войти как гость
                                </Button>
                                : 
                                <></>
                            }
                        </div>
                        { location.pathname === LOGIN_ROUTE 
                            ? <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>
                                    Зарегистрируйся!
                                </NavLink>
                            </div>
                            : <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>
                                    Авторизируйся!
                                </NavLink>
                            </div>
                        }
                    </Row>
                </Form>    
            </Card>
        </Container> 
    );
});

export default Auth;