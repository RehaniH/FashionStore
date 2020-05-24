import React, {Component} from "react";
import axios from 'axios';
import '../css/product-view.css'
import '../css/home.css'
import ShowCommentList from "./comment/showCommentList.component.js";
import AddComment from "./comment/addComment.component.js";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";


class ViewProductComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            product_id: 0,
            product_ref: 0,
            discount_price: 0.00,
            discount_percentage: 0.00,
            retail_price: 0.00,
            description: '',
            product_name: '',
            category: '',
            start_date: new Date,
            end_date: new Date,
            product_image: 'product image',
            discount: ''
        };

        this.displayCondition = this.displayCondition.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/ref-no/' + this.props.match.params.id)
            .then(response => {
                console.log(this.state.start_date);
                this.setState({
                    product_id: response.data._id,
                    product_ref: response.data.ref_no,
                    description: response.data.description,
                    product_name: response.data.name,
                    retail_price: response.data.retail_price,
                    category: response.data.category,
                    product_image: response.data.product_image
                });

                if(response.data.discount !== undefined){
                    let discount = response.data.discount;
                    this.setState({
                        discount: discount,
                        discount_percentage: discount.discount_percentage,
                        discount_price: discount.discount_price,
                        start_date: new Date(discount.start_date),
                        end_date: new Date(discount.end_date)
                    });
                }

            }).catch(err => console.log(err));

    }

    displayCondition(){
        return (this.state.discount !== undefined && this.state.start_date !== Date.now() && this.state.end_date > new Date());
    }


    render() {
        const refno=this.state.product_ref
        if(!this.state.product_ref) {
            return null;
          }
  

        return (
            <div className='container'>
                <div className='float-child'>
                    <img src={this.state.product_image} alt={this.state.product_image} />
                </div>
                <div className='float-child' >
                    <p>{this.state.product_name}</p>

                    <strong>Description</strong>
                    <p>{this.state.description}</p>
                    <p className='ref'>#{this.state.product_ref}</p>
                    <p className={this.state.discount !== undefined ? 'cut':''}>Rs. {this.state.retail_price.toFixed(2)}</p>
                    <p>{this.displayCondition ? this.state.discount_price: ''}</p>
                    <p>{this.displayCondition ? this.state.discount_percentage : ''}</p>
                    <p>{this.displayCondition ? this.state.end_date.toDateString(): ''}</p>

                    <strong>Size Guide</strong>
                    <img src='http://localhost:4000/items/Size_Guide.png' alt='size guide' height='300px' width='300px'/>

                    <input value='Add to Cart' className='btn btn-danger'/>

                  <hr></hr>  
                </div>      
                
                <AddComment  product={refno}/>
                
                <ShowCommentList product={refno}/>
                
                

            </div>
        );
    }
}

ViewProductComponent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(ViewProductComponent);