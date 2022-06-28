import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Label, Col, Row, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalToggle: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalToggle: !this.state.isModalToggle
        })
    }

    handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }



    render() {
        return (
            <React.Fragment>
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg" /> Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalToggle} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group ">
                                <Label htmlFor="rating">Rating</Label>
                                <Col>
                                <Control.select model='.rating' name="rating" className='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group mt-3">
                                <Label htmlFor="name">Your Name</Label>
                                <Col>
                                <Control.text model=".name" id='name' name='name' placeholder="Your Name" className="form-control" validators={{required, maxLength: maxLength(15), minLength: minLength(3)}}/>
                                <Errors className='text-danger' model=".name" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 2 characters', maxLength:'Must be 15 characters or less'}} />
                                </Col>
                            </Row>
                            <Row className="form-goup mt-3">
                                <Label htmlFor="comment">Comment</Label>
                                <Col>
                                <Control.textarea model=".comment" id="comment" name="comment" rows='6' className='form-control' />
                                </Col>
                            </Row>
                            <Row className="form-group mt-3">
                                <Col>
                                <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

export default CommentForm;