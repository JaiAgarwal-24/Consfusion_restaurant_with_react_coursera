
import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';




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
                <Card>
                    <CardImg width={"100%"} src={dishdata.image} alt={dishdata.name} />
                    <CardBody>
                        <CardTitle>{dishdata.name}</CardTitle>
                        <CardText>{dishdata.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }

}

function RenderComments({ cmtary }) {
    if (cmtary === null || cmtary === "") {
        return (
            <div></div>
        );
    }
    const comment = cmtary.map((cmt) => {
        return (
            <div>
                <ul key={cmt.id} className="list-unstyled">
                    <li>
                        <p>{cmt.comment}</p>
                        <p>-- {cmt.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(cmt.date)))}</p>

                    </li>
                </ul>
            </div>
        );
    });

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comment}
        </div>
    )

}

const DishDetail = (props) => {
    console.log('Dishdetail Component render invoked');
    if (props.dish != null) {
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
                    <RenderComments cmtary={props.comments} />
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

export default DishDetail;