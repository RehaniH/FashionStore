import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";

import AddComment from "./components/comment/addComment.component.js";
import ShowCommentDetails from "./components/comment/showCommentDetails.component.js";
import ShowCommentList from "./components/comment/showCommentList.component.js";
import UpdateComment from "./components/comment/updateComment.component.js";


import AddWishlist from "./components/wishlist/addWishlist.component.js";
import ShowWishlist from "./components/wishlist/showWishlist.component.js";


class App extends Component{

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       
                        <Link to="/" className="navbar-brand">ADELE to your door step</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>

                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Sign In</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={LoginComponent}/>

                    <Route path='/comments' component={ShowCommentList} />
                  
                    <Route path='/add-comment' exact component={AddComment} />
                    <Route path='/edit-comment/:id' exact component={UpdateComment} />
                    <Route path='/show-comment/:id' exact component={ShowCommentDetails} />

                    <Route path='/wishlist/add-wishlist' exact component={AddWishlist} />
                    <Route path='/wishlist/show-wishlist/:username' exact component={ShowWishlist} />

                </div>
            </Router>
        );
    }
}

export default App;
