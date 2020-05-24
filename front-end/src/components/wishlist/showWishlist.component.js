import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WishlistSingle from './wishlistSingle.component';
import '../../css/wishlist.css';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { Redirect } from 'react-router-dom';

import HeaderD from "../public/layout/Header Desktop";
import HeaderM from "../public/layout/Header Mobile";
import Footer from "../public/layout/Footer";





class ShowWishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlists: props.wishlists
    };
  }

  updateStateHandler = () => { 
    const { user } = this.props.auth;
    console.log(user.name);
    axios.get('http://localhost:4000/wishlists/get/'+ user.name)
       .then(res => {
            this.setState({ wishlists: res.data });
       })
       .catch(function(err){
           console.log(err);
      })
 }

  componentDidMount() {
    const { user } = this.props.auth;
    
    axios
      .get('http://localhost:4000/wishlists/get/'+ user.name)
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
    console.log("Print wishlist: " + wishlists);
    let wish_List;

    if(!wishlists) {
      wish_List = "there is no wishlists";
    } else {
      wish_List = wishlists.map((wishlist, k) =>
      
        <WishlistSingle wishlist={wishlist} updateState={this.updateStateHandler} key={k} />
      );
    }

    return (


      <div>
      {/* Header */}
      <header>
          {/* Header desktop */}
          <HeaderD/>
          {/* Header Mobile */}
          <HeaderM/>
          {/* Menu Mobile */}
      </header>
      {/* Slider */}
  

      
      <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        
        <div className="cart-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-heading mb-10"><h2>My wishlist</h2></div>
                <div className="border border-secondary " id="t1">
                <div className="table-wishlist table-hover  m-4" st>
                  <table cellPadding={0} cellSpacing={0} border={0} width="100%">
                    <thead>
                      <tr>
                        <th width="45%"><h5 style={{color: "whitesmoke"}}>Product Name</h5></th>
                        <th width="15%"><h5 style={{color: "whitesmoke"}}>Unit Price (Rs.)</h5></th>
                       
                        <th width="15%" />
                        <th width="10%" />
                      </tr>
                    </thead>
                    <tbody>
                    {wish_List}
                      
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




        <Footer/>
             
      </div>

    


    );
  }
}

ShowWishlist.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ShowWishlist);
