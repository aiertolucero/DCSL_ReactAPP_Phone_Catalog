import React, { Component, useState } from 'react';
import { Container, Card, CardColumns, Modal, Button, Row, Col, Image, Table } from 'react-bootstrap';
import ReactModal from 'react-modal';
import axios from 'axios';

export default class Phones extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            phones: [],
            isLoading: true,
            showModal: false,
            phoneDetails: ""
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        axios.get('https://glacial-refuge-41061.herokuapp.com/api/phones')
            .then(res => {
                this.setState({ phones: res.data });
                this.setState({ isLoading: false });
            })
            .catch(function (error) {
                this.setState({ isLoading: false });
            })
    }

    handleOpenModal (d) {
        this.setState({ phoneDetails: d });
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    render() {
        return (
            <Container className="mt-5">
                <div class={!this.state.isLoading ? 'd-none' : 'd-flex justify-content-center'}>
                    <div class="spinner-border " id="page-spinner" role="status">
                        <span class="sr-only d-flex justify-content-center">Loading...</span>
                    </div>
                </div>
                <CardColumns>
                    {
                        this.state.phones.map(
                            d => (
                                <Card key={d.id} value={d} onClick={() => this.handleOpenModal(d)}>
                                    <Card.Img className="p-3" variant="top" src={d.imageFileName} />
                                    <Card.Body>
                                    <Card.Title>
                                        <p class="d-flex">
                                            <span>{d.name}</span>
                                            <span class="ml-auto badge badge-danger">${d.price}</span>
                                        </p>
                                    </Card.Title>
                                    <Card.Text>
                                        {d.description}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        )
                    } 
                </CardColumns>
                
                <Container id="modalContainer">
                   
                </Container>


                <ReactModal isOpen={this.state.showModal} parentSelector={() => document.querySelector('#modalContainer')}>
                    <Row>
                        {this.state.phoneDetails == ""
                            ?   <div class="spinner-border" id="page-spinner" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            :   <Container>
                                    <Modal.Body>
                                        <Row>
                                            <Col sm={4}>
                                                <Image className="w-100" src={this.state.phoneDetails.imageFileName} rounded />
                                            </Col>
                                            <Col sm={8}>
                                                <h1>{this.state.phoneDetails.name}</h1>
                                                <p>{this.state.phoneDetails.description}</p>
                                                <Table striped bordered hover size="sm">
                                                    <tbody>
                                                        <tr>
                                                            <th>Manufacturer</th>
                                                            <td>{this.state.phoneDetails.manufacturer}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Color</th>
                                                            <td>{this.state.phoneDetails.color}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Screen</th>
                                                            <td>{this.state.phoneDetails.screen}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Processor</th>
                                                            <td>{this.state.phoneDetails.processor}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Ram</th>
                                                            <td>{this.state.phoneDetails.ram}</td>
                                                        </tr>
                                                        <tr className="bg-danger text-white">
                                                            <th>Price</th>
                                                            <td>{this.state.phoneDetails.price}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleCloseModal}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Container>
                                
                        }
                    </Row>
                </ReactModal>
            </Container>
        )
    }
}