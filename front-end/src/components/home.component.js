import React, {Component} from "react";
import axios from 'axios'
import '../css/home.css'
import {Link} from "react-router-dom";
import AddWishlist from "./wishlist/addWishlist.component.js";
import HeaderD from "./public/layout/Header Desktop";
import HeaderM from "./public/layout/Header Mobile";
import Slider from "./public/layout/Slider";
import Footer from "./public/layout/Footer";

const Product = props =>(

    <div className="col-lg-4">
        <div>
            {/* Block2 */}
            <div className="block2">
                <div className="block2-pic hov-img0">
                    <img src={props.product.product_image} alt={props.product.name} height="450px" width="200px"/>
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
                        <AddWishlist product={props.product} ></AddWishlist>
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
                <Slider/>
                {/* Product */}
                {/*<section className="bg0 p-t-23 p-b-140">*/}
                {/*<div className="container">*/}

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
                {/*</div>*/}
                {/* Footer */}
                <Footer/>
                {/* Back to top */}
            </div>
        );
    }
}

export default Home;
