
import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";



class DishDetail extends Component {

    constructor(props) {
        super(props);
}

renderDish(dishdata) {
    if (dishdata != null) 
    {
        return(     
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg  width={"100%"} src={dishdata.image} alt={dishdata.name} />
                    <CardBody>
                        <CardTitle>{dishdata.name}</CardTitle>
                        <CardText>{dishdata.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            );
    }
    else {
        return(
            <div></div>
        );
    }

    }

renderComments(cmtary) {
    if (cmtary === null || cmtary === "") {
        return(
            <div></div>
        );
    }
    const comment = cmtary.map((cmt) => {
        return(  
            <div>
                <ul key={cmt.id} className="list-unstyled">
                    <li>
                    <p>{cmt.comment}</p>
                    <p>-- {cmt.author},{ new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(cmt.date)))}</p>

                    </li>
                </ul>
            </div>
        );
    });

    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comment}
        </div>
    )
        
    }
        
render() {  

    if (this.props.dish != null){
        return (  
            <div className="container">       
                <div className="row"> 
                    {this.renderDish(this.props.dish)};
                    {this.renderComments(this.props.dish.comments)};
                </div>
            </div> 
        );
    }
    else{
        return(<div></div>);
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

}

export default DishDetail;