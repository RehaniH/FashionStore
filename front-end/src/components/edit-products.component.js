import React, {Component} from "react";
import axios from 'axios';

class editProductsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_name:"",
            category:"",
            quantity: 0,
            manufacturer_price: 0.00,
            retail_price: 0.00,
            description:"",
            product_img:null,
            categories:[]
        }
    }

    componentDidMount() {
        axios.get('' + this.props.match.params.id)
            .then(response=>{
                this.setState({
                    product_name:response.data.product_name,
                    category:response.data.category._id,
                    quantity: response.data.quantity,
                    manufacturer_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description:response.data.description,
                    product_img:response.data.product_image
                })
            })
    }

    render() {
        return (
            <div>
                <p>Edit products component</p>
            </div>
        );
    }
}

export default editProductsComponent;