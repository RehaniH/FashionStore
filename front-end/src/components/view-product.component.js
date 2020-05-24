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
            discount: '',
            qntty:'',
            cart:[]
        };

        this.displayCondition = this.displayCondition.bind(this);
        this.onChangeQtty=this.onChangeQtty.bind(this);
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
                   this.getcartlist();
            }).catch(err => console.log(err));

    }

    getcartlist = () => {
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

    check = (id) => {
        var count = 0
        console.log(id)
        this.state.cart.map((item,index)=> {
            console.log(item.id)
            if(item.id === id)
            count = count + 1
        })
       if(count===0)
           return false
        else
            return true
    }
    onChangeQtty(e) {
        this.setState({ qntty: e.target.value })
    }

    indexxNumber = ()=> {
        const { user } = this.props.auth;
       // console.log(i)
        var obj = {}
        obj.id = this.state.product_id;
        obj.title=this.state.product_name;
        obj.username = user.name;
        obj.quantity = this.state.qntty;
        obj.price =  this.state.retail_price.toFixed(2);
        obj.status=false;

        console.log(obj);

        // this.setState({qnty: ''});


        axios.post('http://localhost:4000/addcart', obj)
            .then(res => console.log((res.data), this.getcartlist(), this.forceUpdate()))
            .catch(error => {
                console.log(error)
            })

    }

    displayCondition(){
        return (this.state.discount !== undefined && this.state.start_date !== Date.now() && this.state.end_date > new Date());
    }


    render() {
        const refno=this.state.product_ref
        if(!this.state.product_ref) {
            return null;
          }

        // if(!this.state.product_ref) {
        //     return null;
        //   }


        return (

            <div className='container'>
                <div className='float-child'>
                    <img src={this.state.product_image} alt={this.state.product_image} style={{height:"570px",width:"490px"}}/>
                </div>
                <div className='float-child' style={{backgroundColor:"lightgray",textAlign:"center"}} >
                    <br></br><br></br>
                    <h1 style={{fontFamily:"cursive"}}>{this.state.product_name}<b></b></h1>
                    <br></br><br></br>
                    <strong style={{color:"blue"}}>Description :</strong>
                    <br></br><br></br>
                    <p>{this.state.description}</p>
                    <p className='ref'>#{this.state.product_ref}</p>
                    <p className={this.state.discount !== undefined ? 'cut':''}> Rs. {this.state.retail_price.toFixed(2)}</p>
                    <p>Rs.{this.displayCondition ? this.state.discount_price: ''}</p>
                    <p>Discount: {this.displayCondition ? this.state.discount_percentage : ''}%</p>
                    <p>{this.displayCondition ? this.state.end_date.toDateString(): ''}</p>

                    <strong>Size Guide</strong>
                    <img src='http://localhost:4000/items/Size_Guide.png' alt='size guide' height='300px' width='300px'/><br></br><br></br><br></br>
                   Number of Pieces <input value={this.state.qntty} onChange={this.onChangeQtty.bind(this)} type="number" min="1" onChangeValue="1"/><br></br><br></br><br></br>
                    <input value='Add to Cart' hidden={this.check(this.state.product_id)} onClick={this.indexxNumber.bind(this)} className='btn btn-danger'/>
                    <input value='View Cart' hidden={!this.check(this.state.product_id)} onClick={() => this.props.history.push('/CartView')} className='btn btn-danger'/><br></br><br></br>
                </div>



                  <hr></hr>

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
