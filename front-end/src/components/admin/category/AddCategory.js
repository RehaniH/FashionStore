import React, {Component} from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";

class AddCategory extends Component{

    constructor() {
        super();
        this.state = {
            name:'',
            description:'',
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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        if(this.handleValidation()){
            const category = {
                name: this.state.name,
                description: this.state.description
            };

            axios
                .post('http://localhost:4000/category/addCategory', category)
                .then(res => {
                    this.setState({
                        name: '',
                        description: ''
                    })
                    this.props.history.push('/categoryList');
                })
                .catch(err => {
                    console.log("Error in Category!");
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
                                <div className="col-lg-6 m-auto">
                                <Link to="/categoryList" className="btn mb-3 btn-success">
                                    Show Categories
                                </Link>
                                </div>
                                <div>

                                    <div className="row">
                                        <div className="col-lg-6 m-auto">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Add Category</h6>
                                        </div>
                                        <div className="card-body">
                                <div className="CreateBook">
                                    <div className="container">
                                                <form noValidate onSubmit={this.onSubmit}>
                                                    <div className='form-group'>
                                                        <label>Name</label>
                                                        <input
                                                            type='text'
                                                            name='name'
                                                            className='form-control'
                                                            value={this.state.name}
                                                            onChange={this.onChange}
                                                        />
                                                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Description</label>
                                                        <input
                                                            type='text'
                                                            name='description'
                                                            className='form-control'
                                                            value={this.state.description}
                                                            onChange={this.onChange}
                                                        />
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

};

AddCategory.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(AddCategory);