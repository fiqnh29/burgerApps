import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/apiUrl';
import { connect } from 'react-redux';
import {addToCart} from '../redux/action';
import {login} from '../redux/action';
import {Link} from 'react-router-dom'
import '../styles/Cart.css'
import { MDBBtn, MDBInput, 
    MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol
} from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Cart extends Component{

    state={
        data:[],
        value:0
    }

    findindexminus=(index)=>{
        let id = this.props.idUser
        let cart = this.props.cart
        if(cart[index].qty <= 1){
            console.log('kurang dari 1')
        }else{
            console.log(index)
            cart[index].qty -= 1
            cart[index].total = cart[index].qty * cart[index].price
            Axios.patch(API_URL + `/Users/${id}`, {cart:cart})
            .then((res)=>{
                Axios.get(API_URL + `/Users/${id}`)
                .then((res)=>{
                    this.setState({data:cart})
                })
            })
        }
    }

    findindexplus=(index)=>{
        let id = this.props.idUser
        let cart = this.props.cart
        console.log(index)
        cart[index].qty += 1
        cart[index].total = cart[index].qty * cart[index].price
        Axios.patch(API_URL + `/Users/${id}`, {cart:cart})
        .then((res)=>{
            Axios.get(API_URL + `/Users/${id}`)
            .then((res)=>{
                this.setState({data:cart})
            })
        })
    }

    increase = (index) => {
        this.setState({ value: this.state.value + 1 });
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    cancelCart=(index)=>{
        let id = this.props.idUser
        let cart = this.props.cart
        cart.splice(index, 1)
        Axios.patch(API_URL + `/Users/${id}`,{cart : cart})
        .then((res)=>{
            Axios.get(API_URL + `/Users/${id}`)
            .then((res)=>{
                this.setState({data:cart})
            })
        })
    }

    renderTotal=()=>{
        let cart = this.props.cart
        console.log(cart)
        let total = 0
        for(let i=0; i<cart.length; i++){
            console.log(cart[i].total)
            total+=cart[i].total
        }
        return total
    }

    onBtnCheckout=()=>{
        let d = new Date()
        let hours = d.getHours()
        let minute = d.getMinutes()
        let times = hours + ':' + minute
        let date = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let time = times + "/" + date + "/" + month + "/" + year
        console.log(time)
        let total = this.renderTotal()
        console.log(total)
        let cart = this.props.cart
        console.table(cart)
        let userID = this.props.idUser
        console.log(userID)
        let username = this.props.username
        console.log(username)
        let checkout = {
            userID,
            username,
            time,
            cart,
            total,
        }
        console.log(checkout)
        if(total === 0){
            alert('cart kosong')
        }else{
            Axios.patch(API_URL + `/Users/${userID}`,{checkout:cart})
            // alert('succes')
        }

    }


    renderCart=()=>{

        let cart = this.props.cart
        console.log(cart)
        console.log(cart.length)
        return cart.map((val, index)=>{
            return(
                <div className='Cart-con-menu'>
                    <div className='Cart-con-cancel-btn'>
                        <button className='Cart-cancel-btn' onClick={() => this.cancelCart(index)}><FontAwesomeIcon icon='times'/></button>
                    </div>
                        <div className='Cart-con-menu-name'>{val.name}</div>
                    <div className='Cart-con-img'>
                        <img width='100%' src={val.image} />
                    </div>
                    <div className='Cart-con-detail-menu'>
                        <div className='Cart-con-detail'>Menu : {val.menuType}</div>
                        <div className="def-number-input number-input MDnum-box">
                            <div className='Cart-con-detail'>Quantity : 
                                <button onClick={() => this.findindexminus(index)}className="minus MDqty">-</button>
                                <input className="quantity MDqty inputQty MDqty-val" name="quantity" value={val.qty} onChange={()=> console.log('change')}
                                type="number" />
                                <button onClick={() => this.findindexplus(index)} className="plus MDqty">+</button>
                            </div>
                        </div>
                        <div className='Cart-con-detail'>Price : Rp. {val.price.toLocaleString()}</div>
                        <div className='Cart-con-detail'>Total : Rp.  {val.total.toLocaleString()}</div>
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div className='Cart-container'>
                <div className='Cart-clearfix'>
                    {this.renderCart()}
                </div>
                <div className='Cart-con-btn-checkout'>
                <Link to='/checkout'>
                <MDBBtn onClick={this.onBtnCheckout} color='blue' className='Cart-btn-checkout' size='lg'>Checkout</MDBBtn>
                </Link>
                </div>
                <h1 style={{color:'white'}}>{this.renderTotal()}</h1>
                <MDBBtn onClick={this.cnslcheck}>console</MDBBtn>
            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return{
        username: state.user.username,
        idUser: state.user.id,
        cart: state.user.cart
    }
}
 
export default connect(mapStatetoProps, { login })(Cart);