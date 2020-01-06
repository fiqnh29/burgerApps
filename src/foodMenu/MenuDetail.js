import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/apiUrl';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addToCart } from '../redux/action';
import '../styles/MenuDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBContainer, MDBCard, MDBCardImage, MDBRow, MDBCol,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn 
} from "mdbreact";


class MenuDetail extends Component {
    state = { 
        data: [],
        value: 0,
    }

    decrease = () => {
        let min = this.state.value
        if(min <= 0){
            this.setState({value: this.state.value = 0})
        }else{

            this.setState({ value: this.state.value - 1 });
        }
    }
    
    increase = () => {
        this.setState({ value: this.state.value + 1 });
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        console.log(this.props.location.search)
        // console.log(id)
        Axios.get(API_URL+`/menu/${id}`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    priceLocalString=()=>{
        let data = this.state.data
        let output = 0
        console.log(data.price)
        output += data.price
        console.log(output.toLocaleString())
        return output.toLocaleString()
    }

    renderPrice = () => {
        let data = this.state.data
        return(
            <div className='MDclearfix'>
                <img className='MDimg' src={data.image}/>
                <div className='MDdetail'>
                    <p className='MDname'>{data.name}</p>
                    <p className='MDprice'>Rp. {this.priceLocalString()}</p>
                    <div className='MDqty-box'>
                        {/* <input className='MDqty' min="1" type="number" placeholder='0' /> */}
                        <div className="def-number-input number-input MDnum-box">
                        <span className='MDqty-text'>Quantity : </span>
                            <button onClick={this.decrease} className="minus MDqty">-</button>
                            <input className="quantity MDqty inputQty MDqty-val" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                            type="number" />
                            <button onClick={this.increase} className="plus MDqty">+</button>
                        </div>
                        <div className='MDqty-text'>Total : RP. <span>{this.renderTotal()}</span></div>
                        <MDBBtn onClick={this.addToCart}  color="amber" className='MDbtn'>
                            <FontAwesomeIcon size='lg' icon='shopping-cart'/>
                        </MDBBtn>
                    </div>
                </div>
                
            </div>
        )
    }

    renderTotal=()=>{
        let qty = this.state.value
        let price = this.state.data
        let total = 0
        console.log('qty: '+qty)
        console.log('price: '+price.price)
        console.log('total: '+total)
        total += qty*price.price
        console.log(total)
        return(
            total.toLocaleString()
        )

    }

    findIndexOfMenu = () => {
        let data = this.state.data
        let name = data.name
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                return i
            }
        }
    }

    sameMenuName = () => {
        let data = this.state.data
        let name = data.name
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                return true
            }
        }
        return false
    }

    addToCart=()=>{
        console.log('=========add to cart========')
        let {cart, idUser} = this.props
        let { name, image, id, price, menuType, booked } = this.state.data
        let data = this.state.data
        let qty = this.state.value
        let total = 0
        total += qty*data.price
        console.log('ttl: '+total)
        console.log('qty: '+qty)
        console.log('idUser: '+idUser)
        console.log(total)
        let addCart = {
            id,
            name,
            menuType,
            price,
            qty,
            total,
            image
            // booked,
        }
        let same = this.sameMenuName()
        if(qty === 0){
            alert('cart kosong')
        }
        else{
            if(cart.length === 0 || !same){
                console.log('cart kosong')
                cart.push(addCart)
                console.log(cart)
                Axios.patch(API_URL + `/Users/${idUser}`, {cart:cart})
                // // alert('succes')
            }else if(same){
                console.log('cart ada')
                console.log(same)
                let index = this.findIndexOfMenu()
                cart[index].total += total
                console.log(cart[index].total)
                cart[index].qty += qty
                console.log(cart[index].qty)
                console.table(cart)
                Axios.patch(API_URL + `/Users/${idUser}`,{cart:cart})

            }
        }

    }


    render() { 
        return(
            <div className='MDcontainer'>
                {this.renderPrice()}
                {/* <MDBBtn onClick={this.priceLocalString}>console</MDBBtn> */}
            </div>

        )
    }
}

const mapStatetoProps = (state) => {
    return{
        idUser: state.user.id,
        cart: state.user.cart
    }
}
 
export default connect(mapStatetoProps, { addToCart })(MenuDetail);