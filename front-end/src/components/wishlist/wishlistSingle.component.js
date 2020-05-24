import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti'
import { confirmAlert } from 'react-confirm-alert'; 

const WishlistSingle = (props) => {
  const  wishlist  = props.wishlist;
  


  // function onDeleteClick (id) {

  //     axios
  //       .delete('http://localhost:4000/wishlists/'+id)

  //       .then(() => props.updateState())                    
  //       .catch(err => console.log(err))
       
  //   };


    alert = (id) => {

      

      confirmAlert({
        
        title: 'Confirm Delete',
        message: 'Are you sure you want remove this item from wishlist?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>{
              axios
              .delete('http://localhost:4000/wishlists/'+id)
      
              .then(() => props.updateState())                    
              .catch(err => console.log(err))
          }
          },
          {
            label: 'No',
            onClick: () => console.log('delete declined')
          }
        ]
      });
    };


  return(
      // <div className="card-container">
          
      //     <div className="desc">
      //         <h2>
      //             <Link to={`/wishlists/show-wishlist/${wishlist._id}`}>
      //                 { wishlist.username }
      //             </Link>
      //         </h2>
      //         <h3>{wishlist.productname}</h3>
      //         <p>{wishlist.price}</p>
      //     </div>
      //     <div className="col-md-6">
      //       <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={onDeleteClick.bind(this,wishlist._id)}>X</button><br />
      //     </div>
      // </div>

                      <tr>
                        <td width="45%">
                          <div className="display-flex align-center">
                            <div className="img-product">
                              <img src={wishlist.productimage} alt="" className="mCS_img_loaded" />
                            </div>
                            <div className="name-product">
                              <b>
                            <Link to={'/home/'+ wishlist.ref_no}>
                            { wishlist.productname }
                            </Link>
                            </b>
                            </div>
                          </div>
                        </td>
                        <td width="15%" className="price">{wishlist.price}</td>
                        
                        <td width="15%"><button className="round-black-btn small-btn">Add to Cart</button></td>
                        <td width="10%" className="text-center"><a href="#" className="trash-icon"><i className="far fa-trash-alt" /></a></td>
                        <td width="15%"><a style={{color: "red"}} onClick={alert.bind(this,wishlist._id)}><TiDelete size={32}/></a></td>
                        
                      </tr>
  )
}

export default WishlistSingle;