import * as React from 'react';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import jwt from 'jwt-decode'

import '../../css/TopMenu.css'
import UserSessionWidget from '../LandingPage/UserSessionWidget'
import UserManagementWidget from '../UserManagement/UserManagementWidget'
import OpenUserManagementButton from '../UserManagement/OpenUserManagementButton'

import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/AuthenticationSlice'


const TopMenu = () => {

    const accessToken = useSelector(selectAccessToken)
    const UserButton = <OpenUserManagementButton />
    const UserWidget = <UserManagementWidget />

    let user = {
        isAdministrator: false
    }

    if (accessToken !== null) {
        user = jwt(accessToken)
        console.log('User from accesToken: ', user)
    }

    return (
        <Navbar expand="lg">
            <Container>
                {accessToken ? <Link to='/' id='OpenPrivatePageButton'> Touchdesigner-Forum </Link> : <Navbar.Brand >Touchdesigner-Forum</Navbar.Brand>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Threads</Nav.Link>
                        <Nav.Link href="#link">About Us</Nav.Link>
                        <NavDropdown title="About Touchdesigner" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Touchdesigner-Page Link</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Touchdesigner-YT  Link</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {UserWidget}
                    {user.isAdministrator ? UserButton : null}
                    <UserSessionWidget />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default TopMenu;
