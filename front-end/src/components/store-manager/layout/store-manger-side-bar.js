import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

class StoreMangerSideBar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <div className="sidebar-brand-text mx-3">Admin Area</div>
                </NavLink>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link">User View</NavLink>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Store
                </div>

                <li className="nav-item">
                    <NavLink to="/storage/all" className="nav-link">All Products</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/storage/products" className="nav-link">Add New Product</NavLink>
                </li>

            </ul>
        );
    }
}

StoreMangerSideBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(StoreMangerSideBar);