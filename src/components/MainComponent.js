import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import React, { Component } from 'react';
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
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

    const DishWithId = () => {

      const {dishId: dishid} = useParams()

      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishid, 10))[0]} 
        comments = {this.state.comments.filter( (comment) => comment.dishId ===  parseInt(dishid, 10))}
        />
      );

    }

    return (
      <div >
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route extact path='/menu' element={<Menu dishes ={this.state.dishes}/> } />
          <Route path='/menu/:dishId' element={<DishWithId />} />
          <Route extact path= '/contactus' element= {<Contact/>} />
          <Route path="*" element={<Navigate to="/home" replace/>} />
          {/* <Navigate to="/home" replace /> */}
        </Routes>
        <Footer />
      </div>
    );
  }
}



export default Main;
