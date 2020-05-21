import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddCategory extends Component{

    constructor() {
        super();
        this.state = {
            name:'',
            description:''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
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
                this.props.history.push('/addCategory');
            })
            .catch(err => {
                console.log("Error in Category!");
            })
    };

    render() {
        return (
            <div className="CreateBook">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/categoryList" className="btn btn-outline-warning float-left">
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
                                        placeholder='description'
                                        name='description'
                                        className='form-control'
                                        value={this.state.description}
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

export default AddCategory;