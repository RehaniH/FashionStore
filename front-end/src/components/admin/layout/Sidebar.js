import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

class Sidebar extends Component {
    render() {
        return (
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                        <div className="sidebar-brand-text mx-3">Admin Area</div>
                    </NavLink>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Users
                    </div>

                    <li className="nav-item">
                        <NavLink to="/managersList" className="nav-link">Store Manager</NavLink>
                        <NavLink to="/usersList" className="nav-link">Customer</NavLink>
                    </li>

                    <div className="sidebar-heading">
                        Store
                    </div>

                    <li className="nav-item">
                        <NavLink to="/categoryList" className="nav-link">Category</NavLink>
                    </li>

                </ul>
        );
    }
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Sidebar);