import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class AddComment extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email:'',
            ratings:'',
            comment:'',
            date_of:''
            
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email,
            ratings: this.state.ratings,
            comment: this.state.comment,
            date_of: this.state.date_of,
            publisher: this.state.publisher
        };

        axios
            .post('http://localhost:4000/ratings/add', data)
            .then(res => {
                this.setState({
                    username: '',
                    email:'',
                    ratings:'',
                    comment:'',
                    date_of:'',
                    
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in AddComment!");
            })
    };

    render() {
        return (
            <div className="AddComment">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/comments" className="btn btn-outline-warning float-left">
                                Show Comment List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Comment</h1>
                            <p className="lead text-center">
                                Create new book
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='username'
                                        name='username'
                                        className='form-control'
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='email'
                                        placeholder='email'
                                        name='email'
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='number'
                                        placeholder='ratings'
                                        name='ratings'
                                        className='form-control'
                                        value={this.state.ratings}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Add Comment'
                                        name='comment'
                                        className='form-control'
                                        value={this.state.comment}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='date'
                                        placeholder='Today'
                                        name='date_of'
                                        className='form-control'
                                        value={this.state.date_of}
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
}

export default AddComment;
