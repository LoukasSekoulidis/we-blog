import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { createForumMessageAsync, selectCreateMessagePending, getMessagesOfForumThreadAsync } from '../../redux/ForumManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'

import { Button, Modal, Form } from 'react-bootstrap';



function CreateMessageComponent(payload) {
    const dispatch = useDispatch();

    const [showCreateMessage, setShowCreateMessageModal] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const accessToken = useSelector(selectAccessToken)
    const createMessagePending = useSelector(selectCreateMessagePending)


    const handleOpenClick = (e) => {
        setShowCreateMessageModal(true)
    }

    const handleCloseClick = (e) => {
        setShowCreateMessageModal(false)
    }

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'text') {
            setText(e.target.value)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(payload._id)
        dispatch(createForumMessageAsync({ accessToken: accessToken, forumThreadID: payload.payload._id, title: title, text: text }))
        setTitle(null)
        setText(null)
        handleCloseClick(e)
    }

    useEffect(() => {
        dispatch(getMessagesOfForumThreadAsync({ accessToken: accessToken, forumThreadID: payload.payload._id }))
    }, [createMessagePending])


    return (
        <div>
            <Button id="OpenCreateForumMessageDialogButton" variant='primary-outlined' onClick={(e) => handleOpenClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </Button>
            <Modal show={showCreateMessage} onHide={(e) => handleCloseClick(e)}>
                <Modal.Header>
                    Write a Message!
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control id="ForumMessageTitleInput" type="text" placeholder="Title" name='title' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Text </Form.Label>
                            <Form.Control id="ForumMessageTextInput" type="text" placeholder="Text" name='text' onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="CreateForumMessageButton" variant="primary" type="submit" onClick={handleSubmit} >
                        Submit
                </Button>
                    <Button id="CancelCreateForumMessageButton" variant="secondary" type="submit" onClick={handleCloseClick} >
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateMessageComponent
