import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Spinner } from 'react-bootstrap'

import { v4 as uuidv4 } from 'uuid'

import AddUserButton from './AddUserButton'
import UpdateUserForm from './UpdateUserForm'
import AddUserForm from './AddUserForm'
import UserCard from './UserCard'

import {
    hideNewUserDialog, selectShowNewUserDialog,
    deleteUserAsync, hideManagementDialog,
    selectShowUserManagementDialog, selectUsers,
    selectUserPending, getAllUsersAsync,
    getCurrentUserAsync, selectUserError,
    hideUpdateUserDialog, activateUpdateUserDialog,
    selectShowUpdateUserDialog
} from '../../redux/UserManagementSlice'

import { selectAccessToken } from '../../redux/AuthenticationSlice'

const UserManagementWidget = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)

    const showUserManagementDialog = useSelector(selectShowUserManagementDialog)
    const showNewUserDialog = useSelector(selectShowNewUserDialog)
    const showUpdateUserDialog = useSelector(selectShowUpdateUserDialog)
    const createUserError = useSelector(selectUserError)

    const userPending = useSelector(selectUserPending)
    const userArray = useSelector(selectUsers)

    const AddUser = <AddUserButton />
    const NewUser = <AddUserForm />
    const UpdateUser = <UpdateUserForm />

    const hideModal = () => {
        dispatch(hideManagementDialog())
        dispatch(hideNewUserDialog())
        dispatch(hideUpdateUserDialog())
    }

    const updateUser = (userID) => {
        dispatch(activateUpdateUserDialog())
        dispatch(getCurrentUserAsync({ accessToken: accessToken, userID: userID }))
    }

    const deleteUser = (id) => {
        dispatch(deleteUserAsync({ accessToken: accessToken, id: id }))
        dispatch(getAllUsersAsync(accessToken))
    }

    // endless loop
    // force reload on change

    // useEffect(() => {
    //     if (accessToken) {
    //         dispatch(getAllUsersAsync(accessToken))
    //     }
    // }, [userArray])

    if (userPending === false) {
        return (
            <>
                <Modal show={showUserManagementDialog} onHide={() => hideModal()} centered>
                    <Modal.Header>
                        <Modal.Title>User Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showNewUserDialog ? NewUser : null}
                        {showUpdateUserDialog ? UpdateUser : null}

                        {userArray.map(user => (
                            <UserCard
                                user={user}
                                id={user.userID}
                                name={user.userName}
                                key={uuidv4()}
                                updateUser={() => updateUser(user.userID)}
                                deleteUser={() => deleteUser(user.userID)}
                                accessToken={accessToken}
                            />
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        {createUserError && <p style={{ color: 'red', display: 'inline-block' }}> {createUserError} </p>}
                        {showNewUserDialog ? null : AddUser}

                    </Modal.Footer>
                </Modal>
            </>
        )
    } else {
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100px', widht: '100px' }} >
            <Spinner animation="grow" />
        </div>
    }
}
export default UserManagementWidget
