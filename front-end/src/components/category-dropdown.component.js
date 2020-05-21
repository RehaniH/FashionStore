import React, {Component} from "react";
import axios from 'axios';
class CategoryDropdownComponent extends Component{

    constructor(props) {
        super(props);
        this.onChangeSelect= this.onChangeSelect.bind(this);
        this.state ={
            categories: [{value:'', display:'Select Category'}],
            selected_category:'',
            validation:''
        }
    }

    onChangeSelect(e){
        console.log('selected in component: ' + e.target.value);
        this.setState({
            selected_category: e.target.value
            }
        );
        console.log('selected in state: ' + this.state.selected_category);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/category/all')
            .then(response=>{
                this.setState({
                    categories: response.data});
            }).catch(function (err) {
            console.log('error');
        })
    }

    render() {
        return (
            <div>
                <select className="form-control" value={this.state.selected_category} onChange={this.onChangeSelect}>
                    {this.state.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                </select>
            </div>
        );
    }
}

export default CategoryDropdownComponent;