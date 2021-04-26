import React, { Component } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import {ApiInstance as apiInstance} from '../../ApiInstance.js';

export default class AddPhone extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            phoneDetails : {
                name: "",
                manufacturer: "",
                description: "",
                color: "",
                price: "",
                imageFileName: "",
                screen: "",
                processor: "",
                ram: ""
            }
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    savePhone() {
        var self=this;

        apiInstance.post('/phones', this.state.phoneDetails)
            .then(res => {
                if(res.data.success){
                    self.props.closeAddModal()
                    self.props.refreshList()
                } else{
                    alert('Unable to save Phone. Please check your inputs.');
                }
            })
            .catch(function (error) {
                self.props.closeAddModal()
            })
    }

    handleFormChange(evt) {
        this.setState({
            phoneDetails: {
                ...this.state.phoneDetails,
                [evt.target.name]: evt.target.value
            }
        });
    }

    render() {
        return (
            <Container>
                <h4>Add Phone</h4>
                <hr />
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Name" name="name" value={this.state.phoneDetails.name} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Manufacturer
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Manufacturer" name="manufacturer" value={this.state.phoneDetails.manufacturer} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Description
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Description" name="description" value={this.state.phoneDetails.description} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Color
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Color" name="color" value={this.state.phoneDetails.color} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Price
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Price" name="price" value={this.state.phoneDetails.price} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Image
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Image url" name="imageFileName" value={this.state.phoneDetails.imageFileName} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Screen
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Screen" name="screen" value={this.state.phoneDetails.screen} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Processor
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Processor" name="processor" value={this.state.phoneDetails.processor} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Ram
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Ram" name="ram" value={this.state.phoneDetails.ram} onChange={this.handleFormChange}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => this.savePhone()}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.props.closeAddModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Container>
        )
    }
}