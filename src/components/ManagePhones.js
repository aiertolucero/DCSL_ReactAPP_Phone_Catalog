import React, { Component } from 'react';
import { Container, Row, Button, Table, Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import AddPhone from './modals/AddPhone';
import EditPhone from './modals/EditPhone';
import ReactModal from 'react-modal';

export default class ManagePhones extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            phones: [],
            isLoading: true,
            showModal: false,
            showEditModal: false,
            showAddModal: false,
            phoneDetails: ""
        };

        this.closeEditModal = this.closeEditModal.bind(this);
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

    handleClickDelete() {
        confirmAlert({
            title: 'Delete Phone',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => alert('Click Yes')
              },
              {
                label: 'No',
                onClick: () => alert('Click No')
              }
            ]
          });
    }

    closeEditModal() {
        this.setState({ showEditModal: false });
    }

    handleClickEdit(d) {
        this.setState({ phoneDetails: d });
        this.setState({ showEditModal: true });
    }

    render() {
        return (
            <Container className="mt-4">
                <Row>
                    <Col><h1>Manage Phones</h1></Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <div class="text-right">
                            <Button variant="success">Create</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Phone Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.phones.map(
                                        d => (
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.name}</td>
                                                <td>{d.description}</td>
                                                <td>
                                                    <Button className="mr-1"
                                                            variant="secondary" 
                                                            size="sm"
                                                            value={d} onClick={() => this.handleClickEdit(d)}>
                                                            Edit
                                                    </Button>
                                                    <Button variant="danger" 
                                                            size="sm" 
                                                            onClick={() => {this.handleClickDelete()}}>
                                                            Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                } 
                            </tbody>    
                        </Table>
                    </Col>
                </Row>
                <Container id="editModalContainer">
                    <ReactModal isOpen={this.state.showEditModal} parentSelector={() => document.querySelector('#editModalContainer')}>
                        <Row>
                            {this.state.phoneDetails == ""
                                ?   <div class="spinner-border" id="page-spinner" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                :   <EditPhone closeEditModal={this.closeEditModal} phoneDetails={this.state.phoneDetails}/>
                            }
                        </Row>
                    </ReactModal>
                </Container>
            </Container>
        )
    }
}
