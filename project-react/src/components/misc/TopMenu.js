import * as React from 'react';

import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux';

import jwt from 'jwt-decode'

import '../../css/TopMenu.css'
import UserSessionWidget from '../LandingPage/UserSessionWidget'
import UserManagementWidget from '../UserManagement/UserManagementWidget'
import OpenUserManagementButton from '../UserManagement/OpenUserManagementButton'
import OpenForumComponentButton from '../ForumManagement/OpenForumComponentButton'

import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/AuthenticationSlice'

import { hideForumManagement } from '../../redux/ForumManagementSlice'



const TopMenu = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const UserButton = <OpenUserManagementButton />
    const UserWidget = <UserManagementWidget />
    const ForumComponent = <OpenForumComponentButton />

    const HomeLink = <Link to='/' id='OpenPrivatePageButton' onClick={(e) => dispatch(hideForumManagement())}>
        <Navbar.Brand id='OpenPrivatePageButton'>Touchdesigner-Forum</Navbar.Brand>
    </Link>

    let user = {
        isAdministrator: false
    }

    if (accessToken !== null) {
        user = jwt(accessToken)
    }

    return (
        <Navbar expand="lg">
            <Container>
                {accessToken ? HomeLink : <Navbar.Brand >Touchdesigner-Forum</Navbar.Brand>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {accessToken ? ForumComponent : null}
                        {UserWidget}
                        {user.isAdministrator ? UserButton : null}
                    </Nav>
                    <UserSessionWidget />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default TopMenu;
