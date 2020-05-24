import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Footer from "../public/layout/Footer";
import HeaderD from "../public/layout/Header Desktop";
import HeaderM from "../public/layout/Header Mobile";
import Slider from "../public/layout/Slider";

class Register extends Component {
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

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if(this.props.auth.user.role === 'admin'){
                this.props.history.push("/adminDashboard");
            } else if(this.props.auth.user.role === 'manager') {
                this.props.history.push("/dashboard");
            } else if(this.props.auth.user.role === 'user') {
                this.props.history.push("/dashboard");
            }
        }
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
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                {/* Header */}
                <header>
                    {/* Header desktop */}
                    <HeaderD/>
                    {/* Header Mobile */}
                    <HeaderM/>
                    {/* Menu Mobile */}
                </header>
                {/* Slider */}
            <div className="container">
                <div className="row p-t-100 p-b-30">
                    <div className="col-lg-4 m-auto">
                        <div className="card">
                        <div className="" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field">
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
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field">
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
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>

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
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field">
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
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="">
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-primary mb-4"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
            {/* Back to top */}
    </div>
        );
    }
}

Register.propTypes = {
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
)(withRouter(Register));