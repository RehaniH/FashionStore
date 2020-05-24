import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import HeaderD from "../public/layout/Header Desktop";
import HeaderM from "../public/layout/Header Mobile";
import Slider from "../public/layout/Slider";
import Footer from "../public/layout/Footer";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if(this.props.auth.user.role === 'admin'){
                this.props.history.push("/adminDashboard");
            } else if(this.props.auth.user.role === 'manager') {
                this.props.history.push("/storage/all");
            } else if(this.props.auth.user.role === 'user') {
                this.props.history.push("/");
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            if(this.props.auth.user.role === 'admin') {
                var {from} = this.props.location.state || {from: {pathname: '/adminDashboard'}}
            }
            if(this.props.auth.user.role === 'manager') {
                var {from} = this.props.location.state || {from: {pathname: '/dashboard'}}
            }
            if(this.props.auth.user.role === 'user') {
                var {from} = this.props.location.state || {from: {pathname: '/dashboard'}}
            }
            this.props.history.push(from); //redirect user to the page they are trying to access or the dashboard
        }
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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
                {/*<Slider/>*/}
            <div className="container">
                <div className="row p-t-100 p-b-30">
                    <div className="col-lg-4 m-auto">
                        <div className="card">
                        <div className="" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("form-control", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <span className="red-text">
                                     {errors.email}
                                     {errors.emailnotfound}
                                 </span>
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
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
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
                                    Login
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);