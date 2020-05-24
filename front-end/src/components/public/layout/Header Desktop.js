import React, { Component } from "react";
import { Link } from 'react-router-dom';

class HeaderD extends Component {

    render(){
        return(
            <div className="container-menu-desktop">
                <div className="wrap-menu-desktop bg-white">
                    <nav className="limiter-menu-desktop container">
                        {/* Logo desktop */}
                        <h1>
                            ADELE
                        </h1>
                        {/* Menu desktop */}
                        <div className="menu-desktop">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <a href="index.html">Home</a>
                                </li>
                                <li>
                                    <Link to="/dashboard">Products</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Icon header */}
                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-cart">
                                <Link>
                                <i className="zmdi zmdi-shopping-cart" />
                                </Link>
                            </div>
                            <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                                <Link to="/wishlist/show-wishlist/">
                                <i className="zmdi zmdi-favorite-outline" />
                                </Link>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }

}

export default HeaderD;