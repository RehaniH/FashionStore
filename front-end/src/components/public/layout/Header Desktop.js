import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

class HeaderD extends Component {

    render(){
        const { user } = this.props.auth;
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
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <Link to="/dashboard">Products</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Icon header */}
                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-cart">
                                <Link to="/CartView">
                                <i className="zmdi zmdi-shopping-cart" />
                                </Link>
                            </div>
                            <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                                <Link to="/wishlist/show-wishlist/">
                                <i className="zmdi zmdi-favorite-outline" />
                                </Link>
                            </a>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-cart">
                                <Link to="/login">
                                    < FaUserAlt size={22} />
                                </Link>
                            </div>
                                <div className="p-l-22 p-r-11" style={{display: user.name === undefined ? 'none' : 'block'}}>
                                    <a className="" href="/" data-toggle="modal" data-target="#logoutModal">
                                    Logout
                                    </a>
                                </div>
                            </div>
                    </nav>
                </div>
            </div>
        )
    }

}

HeaderD.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(HeaderD));
