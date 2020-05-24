import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUsers, FaUserSecret, FaTags } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";
import axios from "axios";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: '',
            manager: '',
            category: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/users/allUsers')
            .then(response => {
                this.setState({ users: response.data.length });
            })
            .catch(function (error){
                console.log(error);
            })
        axios.get('http://localhost:4000/api/users/allManagers')
            .then(response => {
                this.setState({ manager: response.data.length });
            })
            .catch(function (error){
                console.log(error);
            })
        axios.get('http://localhost:4000/category/categoriesCount')
            .then(response => {
                this.setState({ category: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    render() {
        const { user } = this.props.auth;
        const { users } = this.state;
        const { manager } = this.state;
        const { category } = this.state;
        if(this.props.auth.user.role === 'admin') {
        return (
                <div>
                    <div id="wrapper">
                        <Sidebar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className="container-fluid">
                                    <h1 className="mb-4 font-weight-bold">Welcome, { user.name }</h1>
                                    <div className="row">
                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-success shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div
                                                                className="text-xs font-weight-bold text-success text-uppercase mb-1">Customers
                                                            </div>
                                                            <div
                                                                className="h5 mb-0 font-weight-bold text-gray-800">{ users }
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <FaUsers size={32} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-info shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div
                                                                className="text-xs font-weight-bold text-info text-uppercase mb-1">Store
                                                                Managers
                                                            </div>
                                                            <div className="row no-gutters align-items-center">
                                                                <div className="col-auto">
                                                                    <div
                                                                        className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{ manager }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <FaUserSecret size={32}  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-warning shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div
                                                                className="text-xs font-weight-bold text-warning text-uppercase mb-1">Categories
                                                            </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{ category }
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                                <FaTags size={32} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        );
        } else {
            return <Redirect to='/login' />
        }
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Dashboard);