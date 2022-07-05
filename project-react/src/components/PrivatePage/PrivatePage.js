import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux';


import TopMenu from "../misc/TopMenu";

import { getCurrentUserAsync } from '../../redux/UserManagementSlice'

import '../../css/PublicPage.css'

const PrivatePage = () => {
    const dispatch = useDispatch()

    return (
        <div className="page-content" id="PrivatePage" style={{ background: 'white' }}>
            <TopMenu />
            <h1 > Private Page </h1>
        </div>
    )
}

export default PrivatePage
