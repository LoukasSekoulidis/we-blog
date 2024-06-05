import React from 'react'

import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { activateManagementDialog, getAllUsersAsync, selectShowUserManagementDialog } from '../../redux/UserManagementSlice'

import { selectAccessToken } from '../../redux/AuthenticationSlice'



const OpenUserManagementButton = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const userManagementOpen = useSelector(selectShowUserManagementDialog)


    const handleClick = () => {
        dispatch(activateManagementDialog())
        dispatch(getAllUsersAsync(accessToken))
    }

    const ButtonSelected = <Button id="OpenUserManagementButton" data-id='userManagementSelected' onClick={(e) => handleClick()}> User </Button>
    const ButtonNotSelected = <Button id="OpenUserManagementButton" data-id='userManagementNotSelected' onClick={(e) => handleClick()}> User </Button>



    return (
        <>
            {userManagementOpen ? ButtonSelected : ButtonNotSelected}
        </>
    )
}

export default OpenUserManagementButton;
