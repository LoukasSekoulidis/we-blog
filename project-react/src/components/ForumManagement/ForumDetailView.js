import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';


import TopMenu from '../misc/TopMenu'
import ForumMessageComponent from './ForumMessageComponent'
import CreateMessageComponent from './CreateMessageComponent'

import { selectAccessToken } from '../../redux/AuthenticationSlice'
import { getMessagesOfForumThreadAsync, selectForumMessages, selectCurrentForum } from '../../redux/ForumManagementSlice'
import { Container } from 'react-bootstrap';



function ForumDetailView(payload) {
    const dispatch = useDispatch();

    const accessToken = useSelector(selectAccessToken)
    const forumMessageArray = useSelector(selectForumMessages)
    const currentForum = useSelector(selectCurrentForum)


    useEffect(() => {
        dispatch(getMessagesOfForumThreadAsync({ accessToken: accessToken, forumThreadID: currentForum._id }))
    }, [])

    if (forumMessageArray != null) {
        if (forumMessageArray.length === 0) {
            return (
                <div>
                    <TopMenu />
                    <Container >
                        <div id='forumInfo'>
                            <h2 style={{ textAlign: 'center', marginTop: '.5em' }} >{currentForum.name}</h2>
                            <h4 style={{ textAlign: 'center', marginTop: '.5em' }} >{currentForum.description}</h4>
                        </div>
                        <CreateMessageComponent payload={currentForum} />
                        <p style={{ textAlign: 'center', marginTop: '.5em' }} > No Messages yet! </p>
                    </Container>
                </div >
            )
        } else {
            return (
                <div>
                    <TopMenu />
                    <Container>
                        <div id='forumInfo'>
                            <h2 style={{ textAlign: 'center', marginTop: '.5em' }} >{currentForum.name}</h2>
                            <h4 style={{ textAlign: 'center', marginTop: '.5em' }} >{currentForum.description}</h4>
                        </div>
                        <CreateMessageComponent payload={currentForum} />
                        {forumMessageArray.map((message) => (
                            <ForumMessageComponent payload={message} />
                        ))}
                    </Container>
                </div>
            )
        }
    } else {
        return (
            <div>
                <TopMenu />
                <h2>{currentForum.name}</h2>
                <h4>{currentForum.description}</h4>
                <h1> Loading </h1>
            </div>
        )
    }
    // return (
    //     <div>
    //         <TopMenu />
    //         <h2>{currentForum.name}</h2>
    //         <h4>{currentForum.description}</h4>
    //         {forumMessageArray.map((forum) => (
    //             <ForumMessageComponent payload={forum} />
    //         ))}
    //     </div>
    // )
}

export default ForumDetailView
