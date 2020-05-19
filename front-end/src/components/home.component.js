import React, {Component} from "react";
import axios from 'axios'
import '../css/home.css'
const Product = props =>(
    <div className='col-md-3 details div-border'>
        <img className='img-center' src={props.product.product_image} height='240' width='180' alt={props.product.name}/>
        <p className='center'>{props.product.name}</p>
        <p className={props.product.discount !== undefined ? 'cut' :''}>Rs. {props.product.retail_price.toFixed(2)}</p>
        <p><span className='ref'>#{props.product.ref_no}    </span>
            {props.product.discount !== undefined ? '  Rs. '+ props.product.discount.discount_price.toFixed(2): ' '}
        </p>
        <input value='Add to Cart' className='btn btn-danger img-center'/>
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
                <div className='container'>
                    <div className='row'>
                        {this.state.products.map(function (currentProduct, i) {
                            return <Product product={currentProduct} key={i}/>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;