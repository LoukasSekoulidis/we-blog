import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectAccessToken } from '../../redux/AuthenticationSlice'
import {
    deleteForumThreadAsync,
    getAllForumThreadsAsync,
    updateForumThreadAsync,
    selectDeletePending,
    selectEditPending,
    setCurrentForum,
    getMessagesOfForumThreadAsync,
    openForumDetail,
    hideForumManagement,
} from '../../redux/ForumManagementSlice'

import { Link } from 'react-router-dom';




function ForumComponent(payload) {
    const dispatch = useDispatch()

    const [confirmDelete, setConfirmDelete] = useState('')
    const [editThread, setEditThread] = useState('')

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const accessToken = useSelector(selectAccessToken)
    const deletePending = useSelector(selectDeletePending)
    const editPending = useSelector(selectEditPending)

    const handleOpenDeleteConfirm = () => {
        setConfirmDelete(true)
    }

    const handleCloseDeleteConfirm = () => {
        setConfirmDelete(false)
    }

    const handleDelete = () => {
        dispatch(deleteForumThreadAsync({ accessToken: accessToken, forumThreadID: payload.forum._id }))
    }

    const handleOpenEditModal = () => {
        setEditThread(true)
    }

    const handleCloseEditModal = () => {
        setEditThread(false)
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'description') {
            setDescription(e.target.value)
        }
    }

    const handleClick = () => {
        dispatch(setCurrentForum(payload.forum))
        dispatch(getMessagesOfForumThreadAsync({ accessToken: accessToken, forumThreadID: payload.forum._id }))
        dispatch(openForumDetail())
        dispatch(hideForumManagement())
    }

    const handleEdit = (e) => {
        e.preventDefault()

        dispatch(updateForumThreadAsync({ accessToken: accessToken, forumThreadID: payload.forum._id, name: document.getElementById('TBD-Name').value, description: document.getElementById('TBD-Desciption').value }))
        setName(null)
        setDescription(null)
        handleCloseEditModal()
    }

    useEffect(() => {
        dispatch(getAllForumThreadsAsync())
    }, [deletePending, editPending])

    const forumID = 'ForumThread' + payload.forum._id

    return (
        <div className='forumThread' style={{ width: '49' }}>

            <Card id={forumID} onClick={handleClick} to='/forumThreadDetail' className='forumThread'>
                <Card.Header>
                    <h5 style={{ display: 'inline' }}> {payload.forum.name}</h5>
                    <p style={{ display: 'inline', marginLeft: '.1em', opacity: '50%' }}> - opened by {payload.forum.ownerID}</p>

                </Card.Header>
                <Card.Body>
                    <p> {payload.forum.description} </p>
                </Card.Body>
                <Card.Footer>
                    <Button id={'EditForumThreadButton' + payload.forum._id} onClick={handleOpenEditModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </Button>
                    <Button id={'DeleteForumThreadButton' + payload.forum._id} onClick={handleOpenDeleteConfirm}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </Button>
                    <Link to='/forumThreadDetail' id={'ViewForumThreadButton' + payload.forum._id}>
                        <Button onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </Button>
                    </Link>
                </Card.Footer>

                {/* Deletion Modal */}
                <Modal show={confirmDelete} onClick={handleCloseDeleteConfirm} centered>
                    <Modal.Header>
                        <h3> Do you want to delete '{payload.forum.name}' ?
                            This action can't be reversed!
                        </h3>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button id='DeleteForumThreadConfirm' onClick={handleDelete}> Ok </Button>
                        <Button id='DeleteForumThreadCancel' onClick={handleCloseDeleteConfirm}> Cancel </Button>
                    </Modal.Footer>
                </Modal>


                {/* Edit Modal  */}
                <Modal show={editThread} centered>
                    <Modal.Header>
                        <h3> Edit Thread</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control id="ForumThreadNameInput" type="text" name='name' onChange={handleChange} defaultValue={payload.forum.name} />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="ForumThreadDescriptionInput" type="text" name='description' onChange={handleChange} defaultValue={payload.forum.description} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id='SaveForumThreadButton' onClick={handleEdit}> Ok </Button>
                        <Button id='CancelEditForumThreadButton' onClick={handleCloseEditModal}> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </div>
    )
}

export default ForumComponent

