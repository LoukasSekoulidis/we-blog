import React from 'react'
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap'
import { activateNewUserDialog } from '../../redux/UserManagementSlice'


function AddUserButton() {
    const dispatch = useDispatch()

    return (
        <div>
            <Button id="OpenCreateUserDialogButton" onClick={() => dispatch(activateNewUserDialog())}> Add User </Button>
        </div>
    )
}

export default AddUserButton
