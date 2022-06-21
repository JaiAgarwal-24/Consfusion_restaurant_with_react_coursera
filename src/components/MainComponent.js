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
import { Route, Routes, Navigate } from 'react-router-dom';

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

    return (
      <div >
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route extact path='/menu' element={<Menu dishes ={this.state.dishes}/> } />
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
