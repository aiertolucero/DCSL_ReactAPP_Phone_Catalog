import React, { Component } from 'react';
import { Container, Card, CardColumns, Row} from 'react-bootstrap';
import ReactModal from 'react-modal';
import ViewPhone from './modals/ViewPhone';
import {ApiInstance as apiInstance} from '../ApiInstance.js';

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
        apiInstance.get('/phones')
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
                    <ReactModal isOpen={this.state.showModal} parentSelector={() => document.querySelector('#modalContainer')}>
                        <Row>
                            {this.state.phoneDetails == ""
                                ?   <div class="spinner-border" id="page-spinner" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                :   <ViewPhone handleCloseModal={this.handleCloseModal} phoneDetails={this.state.phoneDetails}/>
                            }
                        </Row>
                    </ReactModal>
                </Container>
            </Container>
        )
    }
}