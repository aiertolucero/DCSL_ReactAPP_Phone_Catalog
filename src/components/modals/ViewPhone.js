import React, { Component } from 'react';
import { Container, Row, Button, Table, Col, Modal, Image } from 'react-bootstrap';

export default class ViewPhone extends Component {
    render() {
        return (
            <Container>
                <Modal.Body>
                    <Row>
                        <Col sm={4}>
                            <Image className="w-100" src={this.props.phoneDetails.imageFileName} rounded />
                        </Col>
                        <Col sm={8}>
                            <h1>{this.props.phoneDetails.name}</h1>
                            <p>{this.props.phoneDetails.description}</p>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    <tr>
                                        <th>Manufacturer</th>
                                        <td>{this.props.phoneDetails.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>{this.props.phoneDetails.color}</td>
                                    </tr>
                                    <tr>
                                        <th>Screen</th>
                                        <td>{this.props.phoneDetails.screen}</td>
                                    </tr>
                                    <tr>
                                        <th>Processor</th>
                                        <td>{this.props.phoneDetails.processor}</td>
                                    </tr>
                                    <tr>
                                        <th>Ram</th>
                                        <td>{this.props.phoneDetails.ram}</td>
                                    </tr>
                                    <tr className="bg-danger text-white">
                                        <th>Price</th>
                                        <td>{this.props.phoneDetails.price}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Container>
        )
    }
}