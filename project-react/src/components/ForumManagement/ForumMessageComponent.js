import React, { useState } from 'react'
import { Button, Card, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { deleteForumMessageAsync, updateForumMessageAsync } from '../../redux/ForumManagementSlice'
import { selectAccessToken } from '../../redux/AuthenticationSlice'

import jwt from 'jwt-decode'

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

    let user;

    if (accessToken !== null) {
        user = jwt(accessToken)
    }

    const isOwner = user.userID === payload.payload.authorID

    const editButton = <Button onClick={handleOpenEditModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
    </Button>

    const deleteButton = <Button onClick={handleOpenDeleteModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>
    </Button>

    return (
        <div>
            <Card className='forumMessage' id={'ForumMessage' + payload.payload._id} className='forumThread'>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <h5 style={{ display: 'inline' }}> {payload.payload.title}</h5>
                                <p style={{ display: 'inline', marginLeft: '.1em', opacity: '50%' }}> - answered by {payload.payload.authorID}</p>
                                <p> {payload.payload.text} </p>
                            </Col>
                            <Col style={{ disply: 'flex', justifyContent: 'right' }}>
                                {isOwner ? editButton : null}
                                {isOwner ? deleteButton : null}
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Footer>
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
        </div >

    )
}


export default ForumMessageComponent
