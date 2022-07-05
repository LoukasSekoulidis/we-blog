import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createForumThreadAsync } from '../../redux/ForumManagementSlice'
import { selectAccessToken, selectError } from '../../redux/AuthenticationSlice'


function CreateForumComponent() {
    const dispatch = useDispatch();

    const [showCreateModal, setShowCreateModal] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const accessToken = useSelector(selectAccessToken)

    // FALSCHER ERROR SELECTOR!!
    const error = useSelector(selectError)

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
        dispatch(createForumThreadAsync({ accessToken: accessToken, name: name, description: description }))
        setName(null)
        setDescription(null)
        console.log(error)
        handleCloseClick(e)
    }

    return (
        <div>
            <Button id="OpenCreateForumThreadDialogButton" onClick={(e) => handleOpenClick(e)}> Add Forum Thread </Button>
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
                    <Button id="CreateUserButton" variant="primary" type="submit" onClick={handleSubmit} >
                        Submit
                    </Button>
                    <Button id="CreateUserButton" variant="secondary" type="submit" onClick={handleCloseClick} >
                        Cancel
                    </Button>
                    {error}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateForumComponent
