import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal } from 'react-bootstrap'
import { selectShowNewUserDialog, selectShowUpdateUserDialog } from '../../redux/UserManagementSlice'



function UserCard({ id, name, updateUser, deleteUser }) {

    const showNewUserDialog = useSelector(selectShowNewUserDialog)
    const showUpdateUserDialog = useSelector(selectShowUpdateUserDialog)

    const [confirmationModal, setConfirmationModal] = useState('')

    const openDeleteModal = () => {
        console.log(confirmationModal)
        setConfirmationModal(true)
        console.log(confirmationModal)
    }

    const closeDeleteModal = () => {
        console.log(confirmationModal)
        setConfirmationModal(false)
        console.log(confirmationModal)
    }

    const userID = "UserItem" + id;
    return (
        <>
            <div hidden={showNewUserDialog || showUpdateUserDialog}>
                <li style={{ listStyleType: "none" }} id={id} key={userID}>
                    <div data-color-mode="light" className="mb-2 card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <Button id={`EditButton${id}`} onClick={(event) => updateUser()}> Update </Button>
                            <Button id={`DeleteButton${id}`} onClick={(event) => openDeleteModal()}> Delete </Button>
                        </div>
                    </div>
                </li>
            </div>
            <Modal show={confirmationModal} centered>
                <Modal.Body id='confirmDelete' centered>
                    <h5 className="card-title"> Are you sure you want to delete {name}?</h5>
                    <Button id='DeleteUserConfirm' onClick={(event) => deleteUser()} centered> Delete {name} </Button>
                    <Button id='DeleteUserCancel' onClick={(event) => closeDeleteModal()} centered> Cancel </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default UserCard
