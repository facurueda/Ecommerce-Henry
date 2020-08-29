import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Catalogue from './components/Catalogue/Catalogue'
import MenuCrud from './components/MenuCrud/MenuCrud'
import Home from './components/Home/Home'
import Product from './components/product/products'

import './App.css'

function App() {
  return (
    <React.Fragment>
      <Home/>
      <Router>
        <Route path="/Catalogue" component={Catalogue} />
        <Route path="/MenuCrud" component={MenuCrud} />
        <Route path="products/:id" component={Product}/>
      </Router>
    </React.Fragment>
  );
}


export default App;

