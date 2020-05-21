import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


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
      date_of: new Date(),
     
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

  // onDeleteClick (id) {
  //   axios
  //     .delete('http://localhost:4000/ratings/'+id)
  //     .then(res => {
  //       this.props.history.push("/");
  //     })
  //     .catch(err => {
  //       console.log("Error form Show Comment Details_deleteClick");
  //     })
  // };

  confirm = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this comment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
          axios
          .delete('http://localhost:4000/ratings/'+id)
          .then(res => {
            this.props.history.push("/comments");
          })
          .catch(err => {
            console.log("Error form Show Comment Details_deleteClick");
          })
        }
        },
        {
          label: 'No',
          onClick: () => console.log('delete declined')
        }
      ]
    });
  };


  render() {

    const SimpleRating = () =>{
      const [value, setValue] = React.useState();

      return (
        <div>
          <Box component="fieldset" mb={3} borderColor="transparent">
           
            <Rating
              name="ratings"
              value={this.state.ratings}
              onChange={this.onChange}
              size="large"
            />
          </Box>
          
        </div>
      );
      }

    return (



      <div>
          
      <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <div className="container">
      <div class="row">
      <div class="col-sm-10 col-sm-offset-1">         

      <div className="comment-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li ><a href="" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">
              
            <Link to={`/comments`}>
            Comments
            </Link>
              
              </h4></a></li>
            <li className="active" ><a href="" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">Update comment</h4></a></li>
          </ul>
              
             
          <div className="tab-pane" id="add-comment-disabled">
                      <br></br>
                        <form  onSubmit={this.onSubmit} className="form-horizontal" > 
                          <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 control-label">UserName:</label>
                            <div className="col-sm-10">
                            <input
                                        type='text'
                                        placeholder='username'
                                        name='username'
                                        className='form-control'
                                        value={this.state.username}
                                        onChange={this.onChange}
                                        readOnly
                            />
                            </div>
                          </div>

                          <div className="form-group">
                           
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                
                              <input
                                        type='hidden'
                                        placeholder='email'
                                        name='email'
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                              </div>
                            </div>
                          </div>

                          

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-2 control-label">Rating:</label>
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                
                            
                             
                              <SimpleRating/>
                    
                             

                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-2 control-label">Comment:</label>
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                <textarea
                                        type='text'
                                        placeholder='Add Comment'
                                        name='comment'
                                        className='form-control'
                                        value={this.state.comment}
                                        onChange={this.onChange}
                                    />
                              
                              </div>
                            </div>
                          </div>

          
                          <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">                    
                              <button className="btn btn-warning btn-circle text-uppercase m-2" type="submit" id="submitComment"><FaSave/> Save Changes</button>
                              <a className="btn btn-danger btn-circle text-uppercase" type="submit"  onClick={this.confirm.bind(this,this.props.match.params.id)} ><MdDelete/></a>
                            </div>
                          </div>            
                        </form>
                      </div>
             
             
              
                        
        </div>

        
        

    </div>
</div>
</div>
</div>
    );
  }
}

export default UpdateComment;
