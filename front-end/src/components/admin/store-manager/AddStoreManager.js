import React, { Component } from "react";
import { Redirect, Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { adminRegisterManager } from "../../../actions/authActions";
import classnames from "classnames";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";
const generator = require('generate-password');

class AddStoreManager extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    generatePassword = (e) => {
        e.preventDefault();
        const password = generator.generate({
            length: 6,
            numbers: true
        });
        this.setState({
            password: password,
            password2: password
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: 'manager'
        };

        this.props.adminRegisterManager(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        if(this.props.auth.user.role === 'admin') {
        return (
            <div>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar/>
                            <div className="container-fluid">
                                <div className="col-lg-6 m-auto">
                                    <Link to="/managersList" className="btn mb-3 btn-success">
                                        Show Store Managers
                                    </Link>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 m-auto">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Add
                                                    Store Manager</h6>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="container">
                                                        <form noValidate onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="name">Name</label>
                                                                <input
                                                                    onChange={this.onChange}
                                                                    value={this.state.name}
                                                                    error={errors.name}
                                                                    id="name"
                                                                    type="text"
                                                                    className={classnames("form-control", {
                                                                        invalid: errors.name
                                                                    })}
                                                                />
                                                                <span className="text-danger">{errors.name}</span>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="email">Email</label>
                                                                <input
                                                                    onChange={this.onChange}
                                                                    value={this.state.email}
                                                                    error={errors.email}
                                                                    id="email"
                                                                    type="email"
                                                                    className={classnames("form-control", {
                                                                        invalid: errors.email
                                                                    })}
                                                                />
                                                                <span className="text-danger">{errors.email}</span>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="password">Password</label><Link to="" className="float-right" onClick={this.generatePassword}>Generate</Link>
                                                                <input
                                                                    onChange={this.onChange}
                                                                    value={this.state.password}
                                                                    error={errors.password}
                                                                    id="password"
                                                                    type="password"
                                                                    className={classnames("form-control", {
                                                                        invalid: errors.password
                                                                    })}
                                                                />
                                                                <span className="text-danger">{errors.password}</span>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="password2">Confirm Password</label>
                                                                <input
                                                                    onChange={this.onChange}
                                                                    value={this.state.password2}
                                                                    error={errors.password2}
                                                                    id="password2"
                                                                    type="password"
                                                                    className={classnames("form-control", {
                                                                        invalid: errors.password2
                                                                    })}
                                                                />
                                                                <span className="text-danger">{errors.password2}</span>
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success btn-block mt-4"
                                                            >Submit</button>
                                                        </form>
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

AddStoreManager.propTypes = {
    adminRegisterManager: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { adminRegisterManager }
)(withRouter(AddStoreManager));