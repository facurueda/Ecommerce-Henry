import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Catalogue from './components/Catalogue/Catalogue'
import MenuCrud from './components/MenuCrud/MenuCrud'
import Home from './components/Home/Home'
import Product from './components/product/products'
import Categories from './components/Categories/Categories';

import './App.css'

function App() {
  return (
    <React.Fragment>
      {/* <Home/> */}
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/catalogue" component={Catalogue}/>
        <Route path='/Categories' component={Categories}/>
        <Route path="/MenuCrud" component={MenuCrud}/>
        <Route path="/products/:id" component={Product}/>
      </Router>
    </React.Fragment>
  );
}


export default App;