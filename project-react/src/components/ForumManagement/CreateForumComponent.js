import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createForumThreadAsync, selectForumError } from '../../redux/ForumManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'


function CreateForumComponent() {
    const dispatch = useDispatch();

    const [showCreateModal, setShowCreateModal] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const accessToken = useSelector(selectAccessToken)

    // FALSCHER ERROR SELECTOR!!
    let error = useSelector(selectForumError)

    const handleOpenClick = (e) => {
        setShowCreateModal(true)
    }

    const handleCloseClick = (e) => {
        setShowCreateModal(false)
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'description') {
            setDescription(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Error: ' + error)
        dispatch(createForumThreadAsync({ accessToken: accessToken, name: name, description: description }))
        setName(null)
        setDescription(null)
        if (error === null) {
            handleCloseClick(e)
        }
    }

    return (
        <div style={{ display: 'inline', margin: 'auto', width: '50%' }}>
            <Button id="OpenCreateForumThreadDialogButton" variant="primary-outlined" onClick={(e) => handleOpenClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </Button>

            <Modal show={showCreateModal} onHide={(e) => handleCloseClick(e)}>
                <Modal.Header>
                    Create new Forum Thread
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="ForumThreadNameInput" type="text" placeholder="Name" name='name' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Description </Form.Label>
                            <Form.Control id="ForumThreadDescriptionInput" type="text" placeholder="Description" name='description' onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="CreateForumThreadButton" variant="primary" type="submit" onClick={handleSubmit} >
                        Submit
                    </Button>
                    <Button id="CancelCreateForumThreadButton" variant="secondary" type="submit" onClick={handleCloseClick} >
                        Cancel
                    </Button>
                    <p style={{ color: 'red' }}> {error}</p>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateForumComponent
