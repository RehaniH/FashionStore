import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";
import Landing from "./components/admin/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AddStoreManager from "./components/admin/store-manager/AddStoreManager";
import AddCategory from "./components/admin/category/AddCategory";
import AddUser from "./components/admin/user/AddUser";
import UsersList from "./components/admin/user/UsersList";
import ManagersList from "./components/admin/store-manager/ManagersList";
import CategoryList from "./components/admin/category/CategoryList";
import UpdateCategory from "./components/admin/category/UpdateCategory";


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
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <Switch>
                        {
                            this.props.auth.user.role === 'user' ?
                                <>
                                    {/*all user components here*/}
                                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                </>
                                :
                                this.props.auth.user.role === 'manager' ?
                                    <>
                                        {/*all store manager components here*/}
                                        <PrivateRoute exact path="/dashboard" component={Dashboard} />

                                    </>
                                    :
                                    this.props.auth.user.role === 'admin' ?
                                    <>
                                        {/*all admin components here*/}
                                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                        <PrivateRoute exact path="/addStoreManager" component={AddStoreManager}/>
                                        <PrivateRoute exact path="/addUser" component={AddUser}/>
                                        <PrivateRoute exact path="/usersList" component={UsersList}/>
                                        <PrivateRoute exact path="/managersList" component={ManagersList}/>
                                        <PrivateRoute exact path="/categoryList" component={CategoryList}/>
                                        <PrivateRoute exact path="/addCategory" component={AddCategory}/>
                                        <PrivateRoute exact path="/updateCategory/:id" component={UpdateCategory}/>
                                    </>
                                        :
                                        <></>
                        }
                    </Switch>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
