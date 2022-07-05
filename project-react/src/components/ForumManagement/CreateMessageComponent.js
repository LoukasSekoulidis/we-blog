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
            <Button id="OpenCreateForumThreadDialogButton" onClick={(e) => handleOpenClick(e)}> Add Forum Thread </Button>
            <Modal show={showCreateMessage} onHide={(e) => handleCloseClick(e)}>
                <Modal.Header>
                    Write a Message!
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control id="ForumThreadNameInput" type="text" placeholder="Title" name='title' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Text </Form.Label>
                            <Form.Control id="ForumThreadDescriptionInput" type="text" placeholder="Text" name='text' onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="CreateUserButton" variant="primary" type="submit" onClick={handleSubmit} >
                        Submit
                </Button>
                    <Button id="CreateUserButton" variant="secondary" type="submit" onClick={handleCloseClick} >
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateMessageComponent
