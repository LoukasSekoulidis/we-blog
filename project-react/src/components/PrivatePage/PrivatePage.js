import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode'


import TopMenu from "../misc/TopMenu";

import { getCurrentUserAsync } from '../../redux/UserManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'


import '../../css/PublicPage.css'

const PrivatePage = () => {
    const dispatch = useDispatch()

    const accessToken = useSelector(selectAccessToken)

    let user;

    if (accessToken !== null) {
        user = jwt(accessToken)
    }

    return (
        <div className="page-content" id="PrivatePage" style={{ background: 'white' }}>
            <TopMenu />
            <h1 style={{ textAlign: 'center', marginTop: '4em' }}> Hi {user.userName}! </h1>
        </div>
    )
}

export default PrivatePage
