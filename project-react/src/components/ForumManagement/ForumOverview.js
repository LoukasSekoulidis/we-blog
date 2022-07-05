import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectAccessToken } from '../../redux/AuthenticationSlice'
import { getAllForumThreadsAsync, selectShowForumManagement, selectForums } from '../../redux/ForumManagementSlice'

import ForumComponent from './ForumComponent'
import TopMenu from '../misc/TopMenu'
import CreateForumComponent from './CreateForumComponent'


function ForumOverview() {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const showForumManagement = useSelector(selectShowForumManagement)
    const forumsArray = useSelector(selectForums)

    useEffect(() => {
        dispatch(getAllForumThreadsAsync())
    }, [])

    if (forumsArray != null) {
        return (
            <div id="ForumThreadList">
                <TopMenu />
                <CreateForumComponent accessToken={accessToken} />
                <h2> Forum Threads </h2>
                <ul>
                    {forumsArray.map((forum) => (
                        < ForumComponent to='/forumThreadDetail' forum={forum} accessToken={accessToken} key={forum._id} />
                    ))}
                </ul>
            </div>
        )
    } else {
        <div>
            <h1> LOADING </h1>
        </div>
    }
}

export default ForumOverview
