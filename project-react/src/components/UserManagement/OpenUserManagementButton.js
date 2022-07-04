import React from 'react'

import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { activateManagementDialog, selectCurrentUser, getAllUsersAsync } from '../../redux/UserManagementSlice'

import { selectAccessToken } from '../../redux/AuthenticationSlice'



const OpenUserManagementButton = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)

    const handleClick = () => {
        dispatch(activateManagementDialog())
        dispatch(getAllUsersAsync(accessToken))
    }

    return (
        <>
            <Button id="OpenUserManagementButton" variant='primary' onClick={(e) => handleClick()}>
                User
        </Button>
        </>
    )
}

export default OpenUserManagementButton;
