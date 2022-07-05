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
        dispatch(updateForumThreadAsync({ accessToken: accessToken, forumThreadID: payload.forum._id, name: name, description: description }))
        setName(null)
        setDescription(null)
        handleCloseEditModal()
    }

    useEffect(() => {
        dispatch(getAllForumThreadsAsync())
    }, [deletePending, editPending])

    const forumID = 'ForumThread' + payload.forum._id

    return (
        <div>
            <Card id={forumID} className='forumThread'>
                <Card.Header>
                    <h5> {payload.forum.name}</h5>
                </Card.Header>
                <Card.Body>
                    <p> {payload.forum.description} </p>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={handleOpenDeleteConfirm}> Delete </Button>
                    <Button onClick={handleOpenEditModal}> Edit </Button>
                    <Link to='/forumThreadDetail' id='OpenForumThreadOverviewButton'>
                        <Button onClick={handleClick}> Open Thread </Button>
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
                        <Button onClick={handleDelete}> Ok </Button>
                        <Button onClick={handleCloseDeleteConfirm}> Cancel </Button>
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
                                <Form.Control id="UserNameInput" type="text" name='name' onChange={handleChange} defaultValue={payload.forum.name} />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="PasswordInput" type="text" name='description' onChange={handleChange} defaultValue={payload.forum.description} />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleEdit}> Ok </Button>
                        <Button onClick={handleCloseEditModal}> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </div>
    )
}

export default ForumComponent

