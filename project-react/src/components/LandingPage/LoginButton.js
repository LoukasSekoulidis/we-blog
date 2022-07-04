import React from 'react'

import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import { activateLoginDialog } from '../../redux/AuthenticationSlice';


const LoginButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button id="OpenLoginDialogButton" variant='primary' onClick={() => dispatch(activateLoginDialog())}>
        Login
      </Button>
    </>
  )
}

export default LoginButton;