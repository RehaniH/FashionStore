import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';


class AddWishlist extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            productname:'',
            price:''
            
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            productname: this.state.productname,
            price: this.state.price
            
        };

        axios
            .post('http://localhost:4000/wishlists/add/', data)
            .then(res => {
                this.setState({
                    username: '',
                    productname:'',
                    price:''
                    
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in AddWishlist!");
            })
    };

    render() {
        return (
            <div className="AddWishlist">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/comments" className="btn btn-outline-warning float-left">
                                Show Comment List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add new wishlist</h1>
                            <p className="lead text-center">
                                
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
                                        type='productname'
                                        placeholder='productname'
                                        name='productname'
                                        className='form-control'
                                        value={this.state.productname}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='number'
                                        placeholder='price'
                                        name='price'
                                        className='form-control'
                                        value={this.state.price}
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

export default AddWishlist;
