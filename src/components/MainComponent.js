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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
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

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} />
      );
    };



    return (
      <div >
        <Header />
        {/* <Routes> */}
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
            <Switch>
              {/* <Route path='/home' element={<HomePage />} /> */}
              <Route path='/home' component={HomePage} />
              {/* <Route exact path='/menu' element={<Menu dishes ={this.props.dishes}/> } />/ */}
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              {/* <Route path='/menu/:dishId' element={<DishWithId />} /> */}
              <Route path='/menu/:dishId' component={DishWithId} />
              {/* <Route extact path= '/contactus' element= {<Contact/>} /> */}
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              {/* <Route extact path='/aboutus' element = { <About leaders = {this.props.leaders}/>} /> */}
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
              {/* <Route path="*" element={<Navigate to="/home" replace/>} /> */}
              {/* <Navigate to="/home" replace /> */}
              {/* </Routes> */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
