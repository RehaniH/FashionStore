import React, { Component } from "react";
import {Link} from "react-router-dom";

class HeaderM extends Component {

    render(){
        return(

            <div className="wrap-header-mobile">
                {/* Logo moblie */}
                <div className="logo-mobile">
                    <h1>
                        ADELE
                    </h1>
                </div>
                {/* Icon header */}
                <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 js-show-cart">
                        <Link>
                        <i className="zmdi zmdi-shopping-cart" />
                        </Link>
                    </div>
                    <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10">
                        <Link to="/wishlist/show-wishlist/">
                        <i className="zmdi zmdi-favorite-outline" />
                        </Link>
                    </a>
                </div>
                {/* Button show menu */}
                <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
                </div>
            </div>
        )
    }

}

export default HeaderM;