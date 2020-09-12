import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Catalogue from './components/Catalogue/Catalogue'
import MenuCrud from './components/MenuCrud/MenuCrud'
import Home from './components/Home/Home'
import Product from './components/product/products'
import Categories from './components/Categories/Categories';
import AdminNavBar from './components/AdminNavBar/AdminNavBar'

import './App.css'
import Order from './components/Order/order';
import NavBar from './components/NavBar/navBar';
import adminOrdersTable from './components/adminOrdersTable/adminOrdersTable';
import Login from './components/LogIn/Login';
import Register from './components/Register/Register';
import ProductsBySearchTerm from './components/ProductsBySearchTerm/ProductsBySearchTerm';

function App() {
  return (
    <React.Fragment>
      <div>
        <Router>
        <NavBar />
          <Switch>
            <Route path='/Search' component={ProductsBySearchTerm}/>
            <Route exact path="/" component={Home} />
            <Route path='/productDetail' component={Product} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path='/categories' component={Categories} />
            <Route path="/menuCrud" component={MenuCrud} />
            <Route path='/order' component={Order} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/adminOrdersTable' component={adminOrdersTable}/>
            <Route exact path='/admin' component={AdminNavBar}/>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}
export default App;