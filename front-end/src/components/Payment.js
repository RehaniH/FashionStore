import React, { Component } from 'react';

import './assets/css/styles.css'
import axios from "axios";
//import './assets/js/jquery.payform.min'
//import './assets/js/script'



const img1 = require('./assets/images/amex.jpg')
const img2 = require('./assets/images/mastercard.jpg')
const img3 = require('./assets/images/visa.jpg')

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            card:'',
            paid:''
        }
        this.Payment = this.Payment.bind(this);
        this.onChangeOwner=this.onChangeOwner.bind(this);
        this.onChangeCard=this.onChangeCard.bind(this);
    }

     componentDidMount () {
        const script = document.createElement("script");
        script.src = './assets/js/jquery.payform.min';
        script.async = true;
        // script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }


    onChangeOwner(e) {
        this.setState({ owner: e.target.value })
    }
    onChangeCard(e) {
        this.setState({ card: e.target.value })
    }
    Payment=()=>{
        var object={}
        object.owner=this.state.owner;
        object.card=this.state.card;
        object.subtotal=this.props.match.params.id;

        console.log(object);
       /* axios.post('http://localhost:4000/payment', object)
            .then(res => console.log((res.data)))
            .catch(error => {
                console.log(error)
            })*/
    }
    render(){
        return(



            <div className="creditCardForm">
                <script src="//assets/js/script.js"></script>
                <script src="//assets/js/jquery.payform.min.js"></script>


                <div className="heading">
                    <h1>Confirm Purchase</h1>
                </div>
                <div className="payment">
                    <form>
                        <div className="form-group owner">
                            <label htmlFor="owner"> Card Owner Name</label>
                            <input value={this.state.owner} onChange={this.onChangeOwner.bind(this)}type="text" className="form-control" />
                        </div>
                        <div className="form-group CVV">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" className="form-control" id="cvv"/>
                        </div>
                        <div className="form-group" id="card-number-field">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input value={this.state.card} onChange={this.onChangeCard.bind(this)} type="text" className="form-control" />
                        </div>
                        <div className="form-group" id="expiration-date">
                            <label>Expiration Date</label>
                            <select>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select>
                                <option value="16"> 2016</option>
                                <option value="17"> 2017</option>
                                <option value="18"> 2018</option>
                                <option value="19"> 2019</option>
                                <option value="20"> 2020</option>
                                <option value="21"> 2021</option>
                            </select>
                        </div>
                        <div className="form-group" id="credit_cards">
                            <img src={img3} id="visa"></img>
                            <img src={img2} id="mastercard"></img>
                            <img src={img1} id="amex"></img>
                        </div>
                        <div className="form-group" id="pay-now">
                            <button onClick={this.Payment.bind(this)} type="submit" className="btn btn-default" >Confirm Purchase</button>
                        </div>
                    </form>
                </div>

            </div>


        )
    }

}
export default Payment;
