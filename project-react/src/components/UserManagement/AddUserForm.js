import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Button, Form } from 'react-bootstrap'

import { createUserAsync, getAllUsersAsync, hideNewUserDialog } from '../../redux/UserManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'

function AddUserForm() {

    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)

    const [userID, setUserID] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState('')


    function handleChange(e) {
        if (e.target.name === 'username') {
            setUserName(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name === 'userID') {
            setUserID(e.target.value)
        }
        else if (e.target.name === 'isAdmin') {
            setIsAdmin(e.target.value)
        }
    }


    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createUserAsync({ accessToken: accessToken, userID: userID, userName: userName, password: password, isAdministrator: isAdmin }))
        dispatch(hideNewUserDialog())
    }

    return (
        <>
            <h1> Creat new User </h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>UserID</Form.Label>
                    <Form.Control id="UserIDInput" type="text" placeholder="Enter userID" name='userID' onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control id="UserNameInput" type="text" placeholder="Enter username" name='username' onChange={handleChange} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="PasswordInput" type="text" placeholder="Enter password" name='password' onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check id="IsAdministratorInput" type="checkbox" label="Is Administrator" name='isAdmin' onChange={handleChange} />
                </Form.Group>

                <Button id="CreateUserButton" variant="primary" type="submit" onClick={handleSubmit} >
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddUserForm
