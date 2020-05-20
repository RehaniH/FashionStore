import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WishlistSingle from './wishlistSingle.component';


class ShowWishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlists: props.wishlists
    };
  }

  updateStateHandler = () => { 
    axios.get('http://localhost:4000/wishlists/')
       .then(res => {
            this.setState({ wishlists: res.data });
       })
       .catch(function(err){
           console.log(err);
      })
 }

  componentDidMount() {
    axios
      .get('http://localhost:4000/wishlists/')
      .then(res => {
        this.setState({
          wishlists: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowWishlist');
      })
      
  };


  render() {
    const wishlists = this.state.wishlists;
    console.log("Print Comments: " + wishlists);
    let wish_List;

    if(!wishlists) {
      wish_List = "there is no wishlists";
    } else {
      wish_List = wishlists.map((wishlist, k) =>
        <WishlistSingle wishlist={wishlist} updateState={this.updateStateHandler} key={k} />
      );
    }

    return (
      <div className="ShowWishlist">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">wishlists List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/wishlist/add-wishlist" className="btn btn-outline-warning float-right">
                + Add New wishlist
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {wish_List}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowWishlist;