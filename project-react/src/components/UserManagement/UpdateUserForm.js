import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Button, Form } from 'react-bootstrap'

import { updateUserAsync, getAllUsersAsync, hideUpdateUserDialog, selectCurrentUser } from '../../redux/UserManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'

function UpdateUserForm() {

    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const currentUser = useSelector(selectCurrentUser)

    const [userID, setUserID] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState('')


    function handleChange(e) {
        console.log(userID, userName, password)
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
        dispatch(updateUserAsync({ accessToken: accessToken, userID: currentUser.userID, userName: userName, password: password, isAdministrator: isAdmin }))
        dispatch(hideUpdateUserDialog())
        dispatch(getAllUsersAsync(accessToken))
    }


    function handleCancel(e) {
        e.preventDefault()
        dispatch(hideUpdateUserDialog())
    }

    return (
        <>
            <h1> Update User </h1>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>UserID</Form.Label>
                    <Form.Control id="UserIDInput" type="text" name='userID' value={currentUser.userID} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control id="UserNameInput" type="text" placeholder={currentUser.userName} name='username' onChange={handleChange} defaultValue={currentUser.userName} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="PasswordInput" type="text" placeholder="New password" name='password' onChange={handleChange} defaultValue={currentUser.password} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check id="IsAdministratorInput" type="checkbox" label="Is Administrator" name='isAdmin' onChange={handleChange} defaultValue={currentUser.isAdministrator} defaultChecked={currentUser.isAdministrator} />
                </Form.Group>

                <Button id="SaveUserButton" variant="primary" type="submit" onClick={handleSubmit} >
                    Update User
                </Button>

                <Button id="CancelEditUserButton" variant="secondary" type="submit" onClick={handleCancel} >
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default UpdateUserForm
