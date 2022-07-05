import React from 'react'

import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { openForumManagement } from '../../redux/ForumManagementSlice'


function OpenForumComponentButton() {
    const dispatch = useDispatch()

    return (
        < div >
            <Link to='/forumPage' id='OpenForumThreadOverviewButton'>
                <Button id='forumManagement' to="/forumPage" onClick={(e) => dispatch(openForumManagement())} > Threads </Button>
            </Link>
        </div >
    )
}

export default OpenForumComponentButton
