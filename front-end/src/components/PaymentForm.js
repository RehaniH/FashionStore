import React from "react";
import Card from "react-credit-cards";

import SupportedCards from "./Cards";
import '../css/andrewStyle.css'

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

 class PaymentForm extends React.Component {
    state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        address:"",
        region:"",
        tel:"",
        cart:[],
        formData: null
    };

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/username/'+user.name)
            .then(response => {
                this.setState({cart: response.data})
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getSubTotal=()=>{
        var tot=0;
        for(var i=0 ; i<this.state.cart.length; i++){
            tot += parseInt(this.state.cart[i].price) * parseInt(this.state.cart[i].quantity)
        }
        return tot

    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }


        this.setState({ [target.name]: target.value });
        this.setState({ [target.address]: target.value });
        this.setState({ [target.region]: target.value });
        this.setState({ [target.tel]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        formData.address=this.state.address;
        formData.region=this.state.region;
        formData.tel=this.state.tel;
        formData.price = this.getSubTotal();
       console.log(formData)

        axios.all([
        axios.post('http://localhost:4000/pymt/payment',formData),
        axios.put('http://localhost:4000/updatestate',this.state.cart)
        ]).then(res => console.log((res.data)))
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        const { name, number,address, expiry, cvc, focused, issuer, formData } = this.state;

        return (
            <div key="Payment" style={{backgroundImage:"url('https://i.pinimg.com/originals/98/8c/1e/988c1e07f1f6ca0676a31f8fb1029b09.png')"}}>
                <div className="App-payment">
                    <h1 style={{fontStyle:"italic",fontFamily:"initial",color:"teal"}}>Payment Slip</h1>


                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} style={{backgroundColor:"gainsboro",maxWidth:"600px"}}>
                        <br></br>
                        <h2>Delivery Details</h2>
                        <br></br>
                        <div className="form-group">
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Address"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="region"
                                className="form-control"
                                placeholder="District"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                name="tel"
                                className="form-control"
                                placeholder="Contact number"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <br></br><br></br>
                        <br></br>
                        <h2>Card Details</h2>
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />

                        <br></br>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />

                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button className="btn btn-success btn-block">PAY</button>
                        </div>
                    </form>

                    <br></br><br></br><br></br>

                    <SupportedCards />
                </div>

            </div>
        );
    }
}
PaymentForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(PaymentForm);
