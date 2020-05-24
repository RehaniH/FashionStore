import React, {Component} from "react";
import axios from 'axios'
import '../css/home.css'
import {Link} from "react-router-dom";
import AddWishlist from "./wishlist/addWishlist.component.js";

const Product = props =>(
    // <div className='col-md-3 details div-border'>
        
    //         <div className="img-wrapper">
    //         <Link to={'/home/' + props.product.ref_no}>
    //         <img className='img-center img' src={props.product.product_image} alt={props.product.name}/>
    //         </Link>
    //         <div class="img-overlay">
    //         <AddWishlist product={props.product}></AddWishlist>
    //         </div>
    //         </div>
        
    //     <p className='center'>{props.product.name}</p>
        
    //     <p className={props.product.discount !== undefined ? 'cut' :''}>Rs. {props.product.retail_price.toFixed(2)}</p>
    //     <p><span className='ref'>#{props.product.ref_no}    </span>
    //         {props.product.discount !== undefined ? '  Rs. '+ props.product.discount.discount_price.toFixed(2): ' '}
    //     </p>
            
    //         <input value='Add to Cart' className='btn btn-danger img-center'/>
           
            
    // </div>
            <div className="col-lg-4">
                <div>
                  {/* Block2 */}
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={props.product.product_image} alt={props.product.name} />
                      <Link to={'/home/' + props.product.ref_no}>
                      <a href="" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                        Quick View
                      </a>
                      </Link>
                    </div>
                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l ">
                        <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        {props.product.name}
                        </a>
                        <span className="stext-105 cl3">
                        <p className={props.product.discount !== undefined ? 'cut' :''}>Rs. {props.product.retail_price.toFixed(2)}</p>
                        </span>
                        <span className="stext-105 cl3">
                        <p><span className='ref'>#{props.product.ref_no}    </span>
                        {props.product.discount !== undefined ? '  Rs. '+ props.product.discount.discount_price.toFixed(2): ' '}
                        </p>
                        </span>
                      </div>
                      <div className="block2-txt-child2 flex-r p-t-3">
                            <AddWishlist></AddWishlist>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
);

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            products:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/all')
            .then(response => {
                this.setState({
                    products: response.data
                })
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    displayProducts(){
        return
    };

    render() {
        return (
            // <div>
            //     <div className='container'>
            //         <div className='row'>
            //             {this.state.products.map(function (currentProduct, i) {
            //                 return <Product product={currentProduct} key={i}/>;
            //             })}
                        
            //         </div>
            //     </div>
            // </div>

            <div className="bg0 m-t-23 p-b-140">
            <div className="container">
            <div className="row">
            {/* <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"> */}
                {this.state.products.map(function (currentProduct, i) {
                             return <Product product={currentProduct} key={i}/>;
                })}
            {/* </div> */}
            </div>
            </div>
          </div>
        );
    }
}

export default Home;