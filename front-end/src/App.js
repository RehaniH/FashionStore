//import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";
//import AddComment from "./components/addComment.component.js";
 //import CommentSingle from "./components/commentSingle.component.js";
//import ShowCommentDetails from "./components/showCommentDetails.component.js";
//import ShowCommentList from "./components/showCommentList.component.js";
//import UpdateComment from "./components/updateComment.component.js";
//import productlist from "./components/Productlist"
import cart from "./components/CartView"
import Payment from "./components/Payment"
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import AddComment from "./components/comment/addComment.component.js";
import ShowCommentDetails from "./components/comment/showCommentDetails.component.js";
import ShowCommentList from "./components/comment/showCommentList.component.js";
import UpdateComment from "./components/comment/updateComment.component.js";


import AddWishlist from "./components/wishlist/addWishlist.component.js";
import ShowWishlist from "./components/wishlist/showWishlist.component.js";
import HomeComponent from './components/home.component'
import ViewProductComponent from "./components/view-product.component";
import PaymentForm from "./components/PaymentForm";

//admin components
import AddDiscountComponent from "./components/store-manager/add-discount.component";
import AllProducts from "./components/store-manager/retrieve-products.component";
import AddProducts from "./components/store-manager/manage-products.component";
import EditProducts from "./components/store-manager/edit-products.component"

import Dashboard from "./components/admin/dashboard/Dashboard";
import AddStoreManager from "./components/admin/store-manager/AddStoreManager";
import AddCategory from "./components/admin/category/AddCategory";
import AddUser from "./components/admin/user/AddUser";
import UsersList from "./components/admin/user/UsersList";
import ManagersList from "./components/admin/store-manager/ManagersList";
import CategoryList from "./components/admin/category/CategoryList";
import UpdateCategory from "./components/admin/category/UpdateCategory";
import UpdateProfile from "./components/admin/UpdateProfile";
import Landing from "./components/admin/layout/Landing";
import Homepage from "./components/public/Homepage";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component {
    render(){
        return (
            <Router>

                <div className="App">
                    <Route exact path="/" component={AllProducts} />
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/add-category" component={AddCategory}/>

                    <Route path='/comments' component={ShowCommentList} />
                    <Route path='/add-comment' exact component={AddComment} />
                    <Route path='/edit-comment/:id' exact component={UpdateComment} />
                    <Route path='/show-comment/:id' exact component={ShowCommentDetails} />

                    <Route path='/wishlist/add-wishlist' exact component={AddWishlist} />
                    <Route path='/show-wishlist/' exact component={ShowWishlist} />

                    <Route path='/CartView' exact component={cart} />
                    <Route path="/pay/:id" component={PaymentForm}/>


                    <Route path="/home/:id" component={ViewProductComponent}/>
                    <Route path="/storage/products" exact component={AddProducts}/>
                    <Route path="/storage/all" component={AllProducts}/>
                    <Route path="/storage/discounts/:id" component={AddDiscountComponent}/>
                    <Route exact path="/dashboard" component={HomeComponent} />

                    <Route path="/storage/edit-products/:id" exact component={EditProducts}/>

                    <Switch>
                    {/*all user components here*/}

                    {/*all store manager components here*/}

                    {/*all admin components here*/}
                     <PrivateRoute exact path="/adminDashboard" component={Dashboard} />
                     <PrivateRoute exact path="/addStoreManager" component={AddStoreManager}/>
                     <PrivateRoute exact path="/addUser" component={AddUser}/>
                     <PrivateRoute exact path="/usersList" component={UsersList}/>
                     <PrivateRoute exact path="/managersList" component={ManagersList}/>
                     <PrivateRoute exact path="/categoryList" component={CategoryList}/>
                     <PrivateRoute exact path="/addCategory" component={AddCategory}/>
                     <PrivateRoute exact path="/updateCategory/:id" component={UpdateCategory}/>
                     <PrivateRoute exact path="/updateProfile/:id" component={UpdateProfile}/>
                     <PrivateRoute path='/wishlist/show-wishlist/' exact component={ShowWishlist}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}



export default App;
