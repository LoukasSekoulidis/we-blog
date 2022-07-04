import React from 'react'

import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/AuthenticationSlice';

const LoginButton = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Button id="LogoutButton" variant='primary' onClick={() => dispatch(logout())}>
                Logout
      </Button>
        </>
    )
}

export default LoginButton;