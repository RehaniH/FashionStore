import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";
import AddProducts from "./components/manage-products.component";
import AllProducts from "./components/retrieve-products.component";
import EditProducts from './components/edit-products.component';
import AddDiscountComponent from "./components/add-discount.component";
import ViewProductComponent from './components/view-product.component'
class App extends Component{

    render() {
        return (
            <Router>
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
                                    <Link to="/storage/products" className="nav-link">Store Manager</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/storage/all" className="nav-link">All Products</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/storage/edit/:id" className="nav-link">Edit Products</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Sign In</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>

                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/storage/products" component={AddProducts}/>
                    <Route path="/storage/all" component={AllProducts}/>
                    <Route path="/storage/edit/:id" exact component={EditProducts}/>
                    <Route path="/storage/discounts/:id" exact component={AddDiscountComponent}/>
                    <Route path="/home/:id" exact component={ViewProductComponent}/>
                </div>
            </Router>
        );
    }
}

export default App;
