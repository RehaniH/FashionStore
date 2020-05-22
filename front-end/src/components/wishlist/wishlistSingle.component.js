import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

const WishlistSingle = (props) => {
  const  wishlist  = props.wishlist;


  function onDeleteClick (id) {

      axios
        .delete('http://localhost:4000/wishlists/'+id)

        .then(() => props.updateState())                    
        .catch(err => console.log(err))
       
    };


  return(
      <div className="card-container">
          
          <div className="desc">
              <h2>
                  <Link to={`/wishlists/show-wishlist/${wishlist._id}`}>
                      { wishlist.username }
                  </Link>
              </h2>
              <h3>{wishlist.productname}</h3>
              <p>{wishlist.price}</p>
          </div>
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={onDeleteClick.bind(this,wishlist._id)}>X</button><br />
          </div>
      </div>
  )
}

export default WishlistSingle;