import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import React, { Component } from 'react';
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import { Route, Routes, Navigate } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {

    const HomePage = () => {
      return (
        <Home />
      );
    }

    return (
      <div >
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route extact path='/menu' element={<Menu dishes ={this.state.dishes}/> } />
          <Route path="*" element={<Navigate to="/home" replace/>} />
          {/* <Navigate to="/home" replace /> */}
        </Routes>
        <Footer />
      </div>
    );
  }
}



export default Main;
