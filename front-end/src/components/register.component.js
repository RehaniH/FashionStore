import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component{

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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios
            .post('http://localhost:4000/api/users/register', newUser)
            .then(res => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    password2: ''
                })
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log("Error in Register!");
            })
    };

    render() {
        return (
            <div className="CreateBook">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show BooK List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Book</h1>
                            <p className="lead text-center">
                                Create new book
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='name'
                                        name='name'
                                        className='form-control'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='email'
                                        name='email'
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='password'
                                        name='password'
                                        className='form-control'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='password2'
                                        name='password2'
                                        className='form-control'
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default Register;