import React, { Component } from "react";

import Logout from "../admin/layout/Logout-Modal";
import HeaderD from "./layout/Header Desktop";
import HeaderM from "./layout/Header Mobile";
import Slider from "./layout/Slider";
import Footer from "./layout/Footer";

class Homepage extends Component {
    render(){
        return(
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
                        {/*<div className="p-b-10">*/}
                            {/*<h3 className="ltext-103 cl5">*/}
                                {/*Product Overview*/}
                            {/*</h3>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}
                {/* Footer */}
                <Footer/>
                < Logout/>
                {/* Back to top */}
            </div>

        )
    }

}

export default Homepage;