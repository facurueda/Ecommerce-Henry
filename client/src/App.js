import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Catalogue from './components/Catalogue/Catalogue';
import MenuCrud from './components/MenuCrud/MenuCrud';
import Home from './components/Home/Home';
import Product from './components/product/products';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import './App.css'
import Order from './components/Order/order';
import NavBar from './components/NavBar/navBar';
import adminOrdersTable from './components/adminOrdersTable/adminOrdersTable';
import Login from './components/LogIn/Login';
import Register from './components/Register/Register';
import ProductsBySearchTerm from './components/ProductsBySearchTerm/ProductsBySearchTerm';
import Reviews from './components/Review/Review'
import {withCookies} from 'react-cookie';
import MyAccount from './components/MyAccount/myAccount';
import ResetPassword from './components/LogIn/ResetPassword'
import NewPassword from './components/LogIn/NewPassword';
import Users from './components/Users/Users';
import PagoSuccess from './components/Order/pagesSucces/PagoSuccess';
import UserOrders from './components/MyAccount/userOrders'
import AboutUs from './components/AboutUs/AboutUs'

function App() {
  return (
    <React.Fragment>
      <div>
        <Router>
        <NavBar />
          <Switch>
            <Route path='/Search' component={ProductsBySearchTerm}/>
            <Route path='/auth/reset/' component={NewPassword}/>
            <Route exact path="/" component={Home} />
            <Route path='/productDetail' component={Product} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path='/categories' component={Categories} />
            <Route path='/usuarios' component={Users}/>
            <Route path='/myAccount' component={MyAccount} />
            <Route path="/menuCrud" component={MenuCrud} />
            <Route path='/order' component={Order} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/adminOrdersTable' component={adminOrdersTable}/>
            <Route path='/reviews' component={Reviews}/>
            <Route path='/forgot' component={ResetPassword} />
            <Route path='/pagoSuccess' component={PagoSuccess}/>
            <Route path='/myOrders' component={UserOrders}/>
            <Route path='/aboutUs' component={AboutUs}/>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}
export default withCookies(App);