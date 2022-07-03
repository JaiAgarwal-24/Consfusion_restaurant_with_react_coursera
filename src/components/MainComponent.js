import Menu from './MenuComponent';
import React, { Component } from 'react';
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Route, Routes, Navigate, useParams, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    // const DishWithId = ({match}) => {
    //   return (
    //     <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
    //     comments = {this.state.comments.filter( (comment) => comment.dishId ===  parseInt(match.params.dishId, 10))}
    //     />
    //   );

    // }

    // const DishWithId = () => {

    //   const {dishId: dishid} = useParams()

    //   return (
    //     <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(dishid, 10))[0]} 
    //     comments = {this.props.comments.filter( (comment) => comment.dishId ===  parseInt(dishid, 10))}
    //     />
    //   );

    // }

    // function DishWithId () {

    //   let {dishId} = useParams()
      
    //   {console.log("checked")}

    //   return (
    //     <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]} 
    //     comments = {this.props.comments.filter( (comment) => comment.dishId ===  parseInt(dishId, 10))}
    //     />
    //   );

    // };

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment = {this.props.addComment} />
      );
    };



    return (
      <div >
        <Header />
        {/* <Routes> */}
        <Switch>
          {/* <Route path='/home' element={<HomePage />} /> */}
          <Route path='/home' component={HomePage} />
          {/* <Route exact path='/menu' element={<Menu dishes ={this.props.dishes}/> } />/ */}
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          {/* <Route path='/menu/:dishId' element={<DishWithId />} /> */}
          <Route path='/menu/:dishId' component={DishWithId} />
          {/* <Route extact path= '/contactus' element= {<Contact/>} /> */}
          <Route extact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          {/* <Route extact path='/aboutus' element = { <About leaders = {this.props.leaders}/>} /> */}
          <Route extact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
          {/* <Route path="*" element={<Navigate to="/home" replace/>} /> */}
          {/* <Navigate to="/home" replace /> */}
          {/* </Routes> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
