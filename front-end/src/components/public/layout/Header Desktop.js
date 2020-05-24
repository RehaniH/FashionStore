import React, { Component } from "react";

class Homepage extends Component {

    render(){
        return(
            <div className="container-menu-desktop">
                <div className="wrap-menu-desktop bg-white">
                    <nav className="limiter-menu-desktop container">
                        {/* Logo desktop */}
                        <a href="#" className="logo">
                            <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
                        </a>
                        {/* Menu desktop */}
                        <div className="menu-desktop">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <a href="index.html">Home</a>
                                </li>
                                <li>
                                    <a href="product.html">Shop</a>
                                </li>
                                <li>
                                    <a href="shoping-cart.html">Features</a>
                                </li>
                                <li>
                                    <a href="blog.html">Blog</a>
                                </li>
                                <li>
                                    <a href="about.html">About</a>
                                </li>
                                <li>
                                    <a href="contact.html">Contact</a>
                                </li>
                            </ul>
                        </div>
                        {/* Icon header */}
                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-cart">
                                <i className="zmdi zmdi-shopping-cart" />
                            </div>
                            <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                                <i className="zmdi zmdi-favorite-outline" />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }

}

export default Homepage;