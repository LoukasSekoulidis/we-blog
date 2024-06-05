import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { openForumManagement, selectShowForumManagement } from '../../redux/ForumManagementSlice'


function OpenForumComponentButton() {
    const dispatch = useDispatch()

    const forumManagementOpen = useSelector(selectShowForumManagement)

    const ButtonSelected = < Button id='forumManagement' data-id='forumManagementSelected' to="/forumPage" onClick={(e) => dispatch(openForumManagement())} > Threads </Button >
    const ButtonNotSelected = < Button id='forumManagement' data-id='forumManagementNotSelected' to="/forumPage" onClick={(e) => dispatch(openForumManagement())} > Threads </Button >

    return (
        < div >
            <Link to='/forumPage' id='OpenForumThreadOverviewButton'>
                {forumManagementOpen ? ButtonSelected : ButtonNotSelected}
            </Link>
        </div >
    )
}

export default OpenForumComponentButton
