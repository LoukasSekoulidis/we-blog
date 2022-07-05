import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';


import TopMenu from '../misc/TopMenu'
import ForumMessageComponent from './ForumMessageComponent'
import CreateMessageComponent from './CreateMessageComponent'

import { selectAccessToken } from '../../redux/AuthenticationSlice'
import { getMessagesOfForumThreadAsync, selectForumMessages, selectCurrentForum } from '../../redux/ForumManagementSlice'



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
                    <CreateMessageComponent payload={currentForum} />
                    <h2>{currentForum.name}</h2>
                    <h4>{currentForum.description}</h4>
                    <p> No Messages yet! </p>
                </div>
            )
        } else {
            return (
                <div>
                    <TopMenu />
                    <CreateMessageComponent payload={currentForum} />
                    <h2>{currentForum.name}</h2>
                    <h4>{currentForum.description}</h4>
                    {forumMessageArray.map((message) => (
                        <ForumMessageComponent payload={message} />
                    ))}
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
