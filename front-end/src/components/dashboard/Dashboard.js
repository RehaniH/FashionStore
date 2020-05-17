import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";

class Dashboard extends Component {
    render() {
        return (
                <div>
                    <div id="wrapper">
                        <Sidebar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className="container-fluid">
                                    <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>
                    <Logout/>
                </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);