import React from "react";
import { useDispatch } from 'react-redux';
import { Col, Row, Container, Card } from 'react-bootstrap'

import { activateLoginDialog } from '../../redux/AuthenticationSlice';

import '../../css/PublicPage.css'
import TopMenu from "../misc/TopMenu";

const PublicPage = () => {
    const dispatch = useDispatch();

    return (
        <div className="page-content" id="LandingPage" style={{ background: 'white' }}>
            <TopMenu />
            <Container>
                <Row>
                    <Col sm>
                        <h1 style={{ marginTop: 10 + 'vh' }}>Hi! Welcome to the Touchdesigner Community-Forum. </h1>
                        <h4>
                            Check out some public Threads below or
              <p style={{ display: 'inline' }} className='loginA' onClick={() => dispatch(activateLoginDialog())} > login </p>
              to participate!
            </h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                        <Card >
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                 </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card >
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                 </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}


export default PublicPage;