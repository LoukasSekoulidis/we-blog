import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectAccessToken } from '../../redux/AuthenticationSlice'
import { getAllForumThreadsAsync, selectShowForumManagement, selectForums } from '../../redux/ForumManagementSlice'

import ForumComponent from './ForumComponent'
import TopMenu from '../misc/TopMenu'
import CreateForumComponent from './CreateForumComponent'
import { Container, Row } from 'react-bootstrap';


function ForumOverview() {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const showForumManagement = useSelector(selectShowForumManagement)
    const forumsArray = useSelector(selectForums)

    useEffect(() => {
        dispatch(getAllForumThreadsAsync())
    }, [])

    let gridRow = 0;
    let gridCol = 0;


    if (forumsArray != null) {
        return (
            <div>
                <TopMenu />
                <h2 style={{ textAlign: 'center', marginTop: '.5em' }}> Threads </h2>
                <Container>
                    <CreateForumComponent accessToken={accessToken} />
                    <ul id="ForumThreadList">

                        {forumsArray.map((forum) => (
                            < ForumComponent to='/forumThreadDetail' forum={forum} accessToken={accessToken} key={forum._id} />
                        ))}
                    </ul>
                </Container>
            </div>
        )
    } else {
        <div>
            <h1> LOADING </h1>
        </div>
    }
}

export default ForumOverview
