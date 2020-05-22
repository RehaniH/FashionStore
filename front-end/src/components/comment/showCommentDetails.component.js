import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class ShowCommentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:4000/ratings/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-ShowCommentDetails-API-response: " + res.data);
        this.setState({
          comment: res.data
        })
      })
      .catch(err => {
        console.log("Error from Show Comment Details");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:4000/ratings/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form Show Comment Details_deleteClick");
      })
  };

  confirm = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };


  render() {

    const comment = this.state.comment;
    let commentItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ comment.username }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ comment.email }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{ comment.ratings }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{ comment.comment }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{ comment.date_of }</td>
          </tr>
          
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/comments" className="btn btn-outline-warning float-left">
                  Show comment List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">comment's Record</h1>
              <p className="lead text-center">
                  View comment's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { commentItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,comment._id)}>Delete comment</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/comments/edit-comment/${comment._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit comment
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit comment</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete comment</button> */}

        </div>
      </div>
    );
  }
}

export default ShowCommentDetails;
