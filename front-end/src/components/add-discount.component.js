import React, {Component} from "react";
import axios from 'axios';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
class AddDiscountComponent extends Component{

    constructor(props) {
        super(props);

        this.state ={
            product_id:'',
            product_ref:0,
            product_name:'',
            description:'',
            retail_price:0.00,
            manufactured_price:0.00,
            discount_percentage: 0,
            discount: 0.00,
            discount_price:0.00,
            category:'',
            start_date: new Date(),
            end_date: new Date(),
        };

        this.onChangeDiscount  = this.onChangeDiscount.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/ref-no/'+ this.props.match.params.id)
            .then(response =>{
                this.setState({
                    product_id: response.data._id,
                    product_ref: response.data.ref_no,
                    manufactured_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description: response.data.description,
                    product_name: response.data.name,
                    category: response.data.category
                });
                console.log(response.data.discount.start_date);
                if(response.data.discount !== undefined){
                    this.setState({
                        discount_percentage: response.data.discount.discount_percentage,
                        discount_price: response.data.discount.discount_price,
                        discount: response.data.discount,
                        start_date: new Date(response.data.discount.start_date),
                        end_date: new Date(response.data.discount.end_date)
                    })
                }
            })
            .catch();
    }

    onChangeDiscount(e) {

        let discount= this.state.retail_price *  (e.target.value/100);
        let price = this.state.retail_price - discount;
        this.setState({
            discount_percentage: e.target.value,
            discount_price: price,
            discount: discount
        });
    }

    onChangeStartDate = start_date => {
        this.setState({
            start_date
        });
        console.log(start_date)
    };

    onChangeEndDate = end_date => {
        this.setState({
            end_date
        });
        console.log(end_date)
    };

    onSubmit = e =>{
        e.preventDefault();

        const discountObj = {
            product_id: this.state.product_id,
            discount_percentage: this.state.discount_percentage,
            discount_price: this.state.discount_price,
            discount: this.state.discount,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };

        axios.post('http://localhost:4000/discount/create', discountObj)
            .then(respose => console.log(respose))
            .catch(function (err) {
                console.log(err);
            });

        this.setState({
            discount_percentage: 0,
            discount_price: 0.00,
            discount: 0.00,
            start_date: new Date(),
            end_date: new Date()
        });

    };

    render() {
        return (
            <div>
                <p>Replace here with the AddDiscountComponent</p>
                <div>
                    <label>Product No: </label>{this.state.ref_no}
                    <label>Product Name: </label>{this.state.product_name}
                    <label>Description: </label> {this.state.description}
                    <label>Quantity: </label> {this.state.quantity}
                    <label>Manufactured Price: </label>{this.state.manufacturer_price}
                    <label>Retail Price: </label>{this.state.retail_price}
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Discount Percentage: </label>
                        <input type="number" className="form-control" onChange={this.onChangeDiscount}
                               value={this.state.discount_percentage}/>
                    </div>

                    <div className="form-group">
                        <label>Discount Price: </label>
                        <input type="number" className="form-control" name='discount_price'
                               value={this.state.discount_price} readOnly/>
                    </div>

                    <div className="form-group">
                        <label>Discount : </label>
                        <input type="number" className="form-control" name='discount'
                               value={this.state.discount} readOnly/>
                    </div>

                    <label>Start Date : </label>
                    <Calendar onChange={this.onChangeStartDate} value={this.state.start_date} minDate={new Date()}/>{this.state.start_date.toDateString()}

                    <label>End Date : </label>
                    <Calendar onChange={this.onChangeEndDate} value={this.state.end_date} minDate={this.state.start_date}/>{this.state.end_date.toDateString()}

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Product"/>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddDiscountComponent;