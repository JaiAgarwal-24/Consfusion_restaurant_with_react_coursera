
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Col, Row, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);




// componentDidMount(){
//     console.log('Dishdetail Component ComponentDidMount invoked');
// }

// componentDidUpdate() {
//     console.log('Dishdetail Component ComponentDidUpdate invoked');

// }

function RenderDish({ dishdata }) {
    if (dishdata != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in tranformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width={"100%"} src={baseUrl + dishdata.image} alt={dishdata.name} />
                        <CardBody>
                            <CardTitle>{dishdata.name}</CardTitle>
                            <CardText>{dishdata.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }

}

function RenderComments({ cmtary, postComment, dishId }) {
    if (cmtary === null || cmtary === "") {
        return (
            <div></div>
        );
    }
    const comment = cmtary.map((cmt) => {
        return (

            <Fade in>
                <div>
                    <li key={cmt.id} >
                        <p>{cmt.comment}</p>
                        <p>-- {cmt.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(cmt.date)))}</p>
                    </li>
                </div>
            </Fade>
        );
    });

    return (
        <div className="col-12 col-md-5 m-1">
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <Stagger in>{comment}</Stagger>
                </ul>
            </div>
            <div>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        </div>
    )

}

const DishDetail = (props) => {
    console.log('Dishdetail Component render invoked');
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dishdata={props.dish} />
                    <RenderComments cmtary={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    else {
        return (<div></div>);
    }

    // const dishrender = this.renderDish(this.props.dish);
    // const dishcomment = this.renderComments(this.props.dish.comments);

    // return (  
    //     <div class="container">       
    //     <div className="row"> 
    //         {dishrender}
    //         {dishcomment}
    //     </div>
    //     </div> 
    // );
}


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

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
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
                                    <Control.text model=".name" id='name' name='name' placeholder="Your Name" className="form-control" validators={{ required, maxLength: maxLength(15), minLength: minLength(3) }} />
                                    <Errors className='text-danger' model=".name" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }} />
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

export default DishDetail;