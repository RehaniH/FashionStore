import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Logout from "./layout/Logout-Modal";

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            errors: {}
        };
    }

    handleValidation() {
        let name = this.state.name;
        let errors = {};
        let formIsValid = true;

        if(!name){
            formIsValid = false;
            errors["name"] = "Name field is required";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    componentDidMount() {
        axios
            .get('http://localhost:4000/api/users/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email
                })
            })
            .catch(err => {
                console.log("Error from UpdateBookInfo");
            })

    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();


        if(this.handleValidation()) {
            const data = {
                name: this.state.name
            };

            axios
                .put('http://localhost:4000/api/users/' + this.props.match.params.id, data)
                .then(res => {
                    this.props.history.push('/adminDashboard');
                })
                .catch(err => {
                    console.log("Error in update!");
                })
        }
    };


    render() {
        if(this.props.auth.user.role === 'admin') {
            return (
                <div>
                    <div id="wrapper">
                        <Sidebar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className="container-fluid">
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-6 m-auto">
                                                <div className="card shadow mb-4">
                                                    <div className="card-header py-3">
                                                        <h6 className="m-0 font-weight-bold text-primary">Edit Profile</h6>
                                                    </div>
                                                    <div className="card-body">
                                                        <div>
                                                            <div className="container">
                                                                <form noValidate onSubmit={this.onSubmit}>
                                                                    <div className='form-group'>
                                                                        <label htmlFor="description">Email</label>
                                                                        <input
                                                                            type='text'
                                                                            name='description'
                                                                            className='form-control'
                                                                            value={this.state.email}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                    <div className='form-group'>
                                                                        <label htmlFor="title">Name</label>
                                                                        <input
                                                                            type='text'
                                                                            name='name'
                                                                            className='form-control'
                                                                            value={this.state.name}
                                                                            onChange={this.onChange}
                                                                        />
                                                                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                                                    </div>

                                                                    <button type="submit"
                                                                            className="btn btn-info btn-lg btn-block">Update
                                                                        Profile
                                                                    </button>
                                                                    <small className="text-danger">*Changes can be seen after your next login!!</small>
                                                                </form>
                                                            </div>
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

UpdateProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UpdateProfile);