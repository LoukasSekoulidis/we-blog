import React from 'react'

import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


import { logout } from '../../redux/AuthenticationSlice';

const LoginButton = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Link to='/'>
                <Button id="LogoutButton" variant='primary' onClick={() => dispatch(logout())}>
                    Logout
                </Button>
            </Link>
        </>
    )
}

export default LoginButton;