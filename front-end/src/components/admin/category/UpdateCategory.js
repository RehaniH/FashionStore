import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:''
        };
    }

    componentDidMount() {
        // console.log("Print id: " + this.props.match.params.id);
        axios
            .get('http://localhost:4000/category/'+this.props.match.params.id)
            .then(res => {
                // this.setState({...this.state, book: res.data})
                this.setState({
                    name: res.data.name,
                    description: res.data.description
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

        const data = {
            name: this.state.name,
            description: this.state.description
        };

        axios
            .put('http://localhost:4000/category/'+this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/categoryList');
            })
            .catch(err => {
                console.log("Error in UpdateBookInfo!");
            })
    };


    render() {
        return (
            <div className="UpdateBookInfo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/categoryList" className="btn btn-outline-warning float-left">
                                Show BooK List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Book</h1>
                            <p className="lead text-center">
                                Update Book's Info
                            </p>
                        </div>
                    </div>

                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">Name</label>
                                <input
                                    type='text'
                                    placeholder='Title of the Book'
                                    name='name'
                                    className='form-control'
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <label htmlFor="description">Description</label>
                                <input
                                    type='text'
                                    placeholder='Describe this book'
                                    name='description'
                                    className='form-control'
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateCategory;