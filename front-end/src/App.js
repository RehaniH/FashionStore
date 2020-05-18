import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";
import AddComment from "./components/addComment.component.js";
// import CommentSingle from "./components/commentSingle.component.js";
import ShowCommentDetails from "./components/showCommentDetails.component.js";
import ShowCommentList from "./components/showCommentList.component.js";
import UpdateComment from "./components/updateComment.component.js";
import productlist from "./components/productlist"

//import AddWishlist from "./components/addWishlist.component.js";
//import ShowWishlist from "./components/showWishlist.component.js";


class App extends Component{

    render() {
        return (

            <Router>
                <productlist/>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        {/*<a className="navbar-brand" href="https://github.com/RehaniH/SA" target="_blank">*/}
                        {/*    <img src={logo} width={wid} height={wid} alt="ImageIsHere" />*/}
                        {/*</a> to add the logo*/}
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
                    <Route exact path='/comments' component={ShowCommentList} />
                    <Route path='/comments/add-comment' component={AddComment} />
                    <Route path='/comments/edit-comment/:id' component={UpdateComment} />
                    <Route path='/comments/show-comment/:id' component={ShowCommentDetails} />



                </div>
            </Router>

        );
    }
}

export default App;
//<Route path='/wishlist/add-wishlist' component={AddWishlist} />
//<Route path='/wishlist/show-wishlist/:username' component={ShowWishlist} />
