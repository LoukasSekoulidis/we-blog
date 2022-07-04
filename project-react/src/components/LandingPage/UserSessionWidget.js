import React, { useState } from 'react'

import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSession, selectError, selectAccessToken, selectShowLoginDialog, hideLoginDialog } from '../../redux/AuthenticationSlice'
import LoginButton from './LoginButton';
import LogoutButton from '../PrivatePage/LogoutButton';

const UserSessionWidget = () => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const showLoginDialog = useSelector(selectShowLoginDialog)
    const accessToken = useSelector(selectAccessToken)
    const error = useSelector(selectError)

    const login = <LoginButton />
    const logout = <LogoutButton />

    function handleChange(e) {
        if (e.target.name === 'username') {
            setUserName(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getUserSession({ username: userName, password: password }))
    }

    return (
        <>
            {accessToken ? logout : login}
            <Modal show={showLoginDialog} onHide={() => dispatch(hideLoginDialog())} centered>
                <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="LoginUserIDInput" type="email" placeholder="Enter email" name='username' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name='password' onChange={handleChange} />
                        </Form.Group>
                        <Button id="LoginButton" variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
            </Button>
                        {error && <p style={{ color: 'red', display: 'inline-block' }}> {error} </p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p style={{ display: 'inline' }} className="pwForgottenA"> Password vergessen ?</p>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserSessionWidget;