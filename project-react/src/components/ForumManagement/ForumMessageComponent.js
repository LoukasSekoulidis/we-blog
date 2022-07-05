import React, { useState } from 'react'
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { deleteForumMessageAsync, updateForumMessageAsync } from '../../redux/ForumManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'



function ForumMessageComponent(payload) {
    const dispatch = useDispatch()

    const [confirmDelete, setConfirmDelete] = useState('')
    const [editMessage, setEditMessage] = useState('')

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const accessToken = useSelector(selectAccessToken)

    const handleDelete = () => {
        dispatch(deleteForumMessageAsync({ accessToken: accessToken, forumMessageID: payload.payload._id }))
    }

    const handleOpenDeleteModal = () => {
        setConfirmDelete(true)
    }

    const handleCloseDeleteModal = () => {
        setConfirmDelete(false)
    }

    const handleOpenEditModal = () => {
        setEditMessage(true)
    }

    const handleCloseEditModal = () => {
        setEditMessage(false)
    }

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'text') {
            setText(e.target.value)
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()

        dispatch(updateForumMessageAsync({ accessToken: accessToken, forumMessageID: payload.payload._id, title: title, text: text }))

        setTitle(null)
        setText(null)

        handleCloseEditModal()
    }

    return (
        <div>
            <Card id={payload._id} className='forumThread'>
                <Card.Header>
                    <h4> {payload.payload.title}</h4>
                </Card.Header>
                <Card.Body>
                    <p> {payload.payload.text} </p>
                </Card.Body>
                <Card.Footer>
                    <p> By '{payload.payload.authorID}'</p>
                    <Button onClick={handleOpenEditModal}> Edit </Button>
                    <Button onClick={handleOpenDeleteModal}> Delete </Button>

                </Card.Footer>
            </Card>

            {/* Deletion Modal */}
            <Modal show={confirmDelete} centered>
                <Modal.Header>
                    Are you sure you want to delete this message?
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleCloseDeleteModal}> Cancel </Button>
                    <Button onClick={handleDelete}> Delete </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal  */}
            <Modal show={editMessage} centered>
                <Modal.Header>
                    <h3> Edit Thread</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>

                            {/* auch oben ändern unbedingt!!!! */}
                            <Form.Control id="UserNameInput" type="text" name='title' onChange={handleChange} defaultValue={payload.payload.title} />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>

                            {/* auch oben ändern unbedingt!!!! */}
                            <Form.Control id="PasswordInput" type="text" name='text' onChange={handleChange} defaultValue={payload.payload.text} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEdit}> Ok </Button>
                    <Button onClick={handleCloseEditModal}> Cancel </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}


export default ForumMessageComponent
