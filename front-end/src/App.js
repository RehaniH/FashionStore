import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Some from "./components/something"
import AddCategory from "./components/add-category.component";
import HomeComponent from './components/home.component'
import ViewProductComponent from "./components/view-product.component";
import AddDiscountComponent from "./components/add-discount.component";
import AllProducts from "./components/retrieve-products.component";
import AddProducts from "./components/manage-products.component";

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
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/add-category" component={AddCategory}/>
                    <Route path="/home/:id" component={ViewProductComponent}/>
                    <Route path="/storage/products" component={AddProducts}/>
                    <Route path="/storage/all" component={AllProducts}/>
                    <Route path="/storage/discounts/:id" component={AddDiscountComponent}/>
                    <Switch>
                        {
                            this.props.auth.user.role === 'user' ?
                                <>
                                    {/*all user components here*/}
                                    <PrivateRoute exact path="/dashboard" component={HomeComponent} />
                                </>
                                :
                                this.props.auth.user.role === 'manager' ?
                                    <>
                                        {/*all store manager components here*/}
                                        <PrivateRoute exact path="/something" component={Some} />
                                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                    </>
                                    :
                                    <>
                                        {/*all admin components here*/}
                                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                        <PrivateRoute exact path="/something" component={Some} />
                                    </>
                        }
                    </Switch>
                </div>
            </Router>
        );}
}

App.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
