import React, { Component } from "react";
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";


class Dashboard extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div id="wrapper">
                        <Sidebar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className="container-fluid">
                                    <Switch>
                                    {/*<Route path="/del" component={DEL}/>*/}
                                    {/*<Route path="/add" component={SM_ADD}/>*/}
                                    </Switch>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up" />
                    </a>
                    <Logout/>
                </div>
            </Router>
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