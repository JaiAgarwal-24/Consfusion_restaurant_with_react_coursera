
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
    if (cmtary == null || cmtary == "") {
        return(
            <div></div>
        );
    }
    const comment = cmtary.map((cmt) => {
        return(  
            <div>
                <ul key={cmt.id} className="list-unstyled">
                    <li>{cmt.comment}</li>
                    <li>-- {cmt.author},{cmt.date}</li>
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
    
    // this is wrong.
    // const comment = this.props.dish.comments.map((cmt) => {
    //     if (cmt.comment != "" && cmt.comment != null) {
    //         return(
    //             this.renderComments(cmt)
    //         );
    //     }
    //     else {
    //         return(
    //             <div></div>
    //         );
    //         }
        
    // }) ;

    if (this.props.dish == null){
        return(<div></div>);
    }

    const dishrender = this.renderDish(this.props.dish);
    const dishcomment = this.renderComments(this.props.dish.comments);

    return (          
        <div className="row"> 
            {dishrender}
            {dishcomment}
        </div>
        
    );
}

}

export default DishDetail;