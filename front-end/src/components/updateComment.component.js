import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      ratings: '',
      comment: '',
      date_of: ''
      
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:4000/ratings/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          username: res.data.username,
          email: res.data.email,
          ratings: res.data.ratings,
          comment: res.data.comment,
          date_of: res.data.date_of,
          
        })
      })
      .catch(err => {
        console.log("Error from Update Comment");
      })
  };

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
     
    };

    axios
      .put('http://localhost:4000/ratings/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/comments/show-comment/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in Update Comment!");
      })
  };


  render() {
    return (
      <div className="UpdateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/comments" className="btn btn-outline-warning float-left">
                  Show Comment list
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Comment</h1>
              <p className="lead text-center">
                  Update Comment
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="username">username</label>
              <input
                type='text'
                placeholder='username of the Book'
                name='username'
                className='form-control'
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="email">email</label>
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
            <label htmlFor="ratings">ratings</label>
              <input
                type='text'
                placeholder='ratings'
                name='ratings'
                className='form-control'
                value={this.state.ratings}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="comment">comment</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='comment'
                className='form-control'
                value={this.state.comment}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="date_of"> Date</label>
              <input
                type='date'
                placeholder='date_of'
                name='date_of'
                className='form-control'
                value={this.state.date_of}
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

export default UpdateComment;