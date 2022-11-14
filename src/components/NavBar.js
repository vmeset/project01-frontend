import React, { useContext } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, TO_DO_ROUTE, TO_BUY_ROUTE, DONE_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const NavBar = observer ( () => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark" className='mb-2' expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    {user.isAuth ? 
                        <span>{user.user.username}</span>
                        : 'MyNotes'
                    }
                </Navbar.Brand>
                {user.isAuth ? 
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    : <></>
                }
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ?
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }}
                        navbarScroll
                        >
                            <Nav.Link onClick={() => navigate(TO_DO_ROUTE)}>сделать</Nav.Link>
                            <Nav.Link onClick={() => navigate(TO_BUY_ROUTE)}>купить</Nav.Link>
                            <Nav.Link onClick={() => navigate(DONE_ROUTE)}>завершено</Nav.Link>
                            {user.user.role === 'ADMIN' 
                                ? <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>admin</Nav.Link>
                                : <></>
                            }
                        </Nav>
                        : <Nav></Nav>
                    }
                    {user.isAuth ?
                        <Nav>
                            <Nav.Link onClick={() => {
                                    user.setIsAuth(false)
                                    navigate(LOGIN_ROUTE)
                                    localStorage.removeItem('token')
                                }}
                            >
                                <strong style={{color: "white"}}>Выйти</strong>
                            </Nav.Link>
                        </Nav>
                        : <Nav></Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;