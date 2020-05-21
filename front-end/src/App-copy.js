import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";
import Register from "./components/register.component";
import AddCategory from "./components/add-category.component";

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
                                    <Link to="/login" className="nav-link">Sign In</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/add-category" className="nav-link">Category</Link>
                                </li>


                            </ul>
                        </div>
                    </nav>

                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/add-category" component={AddCategory}/>

                </div>
            </Router>
        );
    }
}

export default App;
