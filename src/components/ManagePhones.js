import React, { Component } from 'react';
import { Container, Row, Button, Table, Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ApiInstance as apiInstance} from '../ApiInstance.js';
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
        this.closeAddModal = this.closeAddModal.bind(this);
        this.getPhoneList = this.getPhoneList.bind(this);
        
    }

    componentDidMount() {
        this.getPhoneList()
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    getPhoneList() {
        this.setState({ isLoading: true });

        apiInstance.get('/phones')
            .then(res => {
                this.setState({ phones: res.data });
                this.setState({ isLoading: false });
            })
            .catch(function (error) {
                this.setState({ isLoading: false });
            })
    }

    handleClickDelete(id) {
        confirmAlert({
            title: 'Delete Phone',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.handleDeletePhone(id)
              },
              {
                label: 'Cancel'
              }
            ]
          });
    }

    closeEditModal() {
        this.setState({ showEditModal: false });
    }

    closeAddModal(){
        this.setState({ showAddModal: false });
    }

    handleClickEdit(d) {
        this.setState({ phoneDetails: d });
        this.setState({ showEditModal: true });
    }

    handleClickAdd(){
        this.setState({ showAddModal: true });
    }
    
    handleDeletePhone(id){
        this.setState({ isLoading: true });
        apiInstance.delete('/phones/'+id)
            .then(res => {
                this.setState({ isLoading: false });
                this.getPhoneList();
            })
            .catch(function (error) {
                this.setState({ isLoading: false });
            })
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
                        <div className="text-right">
                            <Button variant="success" onClick={() => this.handleClickAdd()}>Create</Button>
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
                                    this.state.isLoading 
                                    ?   <tr>
                                            <td colSpan={4}>
                                                <div className="d-flex justify-content-center">
                                                    <div className="spinner-border " id="page-spinner" role="status">
                                                        <span className="sr-only d-flex justify-content-center">Loading...</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    : this.state.phones.map(
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
                                                            onClick={() => {this.handleClickDelete(d.id)}}>
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
                            {this.state.phoneDetails === ""
                                ?   <div className="spinner-border" id="page-spinner" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                :   <EditPhone closeEditModal={this.closeEditModal} phoneDetails={this.state.phoneDetails} refreshList={this.getPhoneList} />
                            }
                        </Row>
                    </ReactModal>
                </Container>
                <Container id="addModalContainer">
                    <ReactModal isOpen={this.state.showAddModal} parentSelector={() => document.querySelector('#addModalContainer')}>
                        <Row>
                            <AddPhone closeAddModal={this.closeAddModal} refreshList={this.getPhoneList} />
                        </Row>
                    </ReactModal>
                </Container>
            </Container>
        )
    }
}
