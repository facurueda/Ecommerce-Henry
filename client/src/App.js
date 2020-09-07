import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Catalogue from './components/Catalogue/Catalogue'
import MenuCrud from './components/MenuCrud/MenuCrud'
import Home from './components/Home/Home'
import Product from './components/product/products'
import Categories from './components/Categories/Categories';

import './App.css'
import Order from './components/Order/order';
import NavBar from './components/NavBar/navBar';
import adminOrdersTable from './components/adminOrdersTable/adminOrdersTable';

function App() {
  return (
    <React.Fragment>
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path='/categories' component={Categories} />
            <Route path="/menuCrud" component={MenuCrud} />
            <Route path="/products/:id" component={Product} />
            <Route path='/order' component={Order} />
            <Route path='/adminOrdersTable' component={adminOrdersTable}/>
          </Switch>
        </Router>

      </div>
    </React.Fragment>
  );
}


export default App;