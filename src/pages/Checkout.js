import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/apiUrl';
import { connect } from 'react-redux';
import {addToCart} from '../redux/action';
import {login} from '../redux/action';
import {MDBTable, MDBTableBody, MDBTableHead, MDBBadge, MDBBtn, MDBDataTable,
    
} from 'mdbreact';



class Checkout extends Component {
    state={
        data:[]
    }

    onBtnOrder=()=>{
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
        let order = this.props.cart
        console.table(order)
        let userID = this.props.idUser
        console.log(userID)
        let username = this.props.username
        console.log(username)
        let checkout = {
            userID,
            username,
            time,
            order,
            total,
        }
        console.log(checkout)
        if(total === 0){
            alert('cart kosong')
        }else{
            Axios.post(API_URL + `/Transaction`, checkout)
            Axios.patch(API_URL + `/Users/${userID}`,{cart:[],checkout:[]})
        }

    }

    renderTotal=()=>{
        let cart = this.props.cart
        console.table(cart.length)
        let total = 0
        for(let i=0; i<cart.length; i++){
            total += cart[i].total
        }
        return total.toLocaleString()
    }

    renderCheckout=()=>{
        let cart = this.props.cart
        console.table(cart.length)
        return cart.map((val , index)=>{
            return(
                <tr>
                    <td>{index + 1}</td>
                    <td><img width='100px' src={val.image}/>&nbsp;&nbsp;{val.name}</td>
                    <td>Rp. {val.price.toLocaleString()}</td>
                    <td>{val.qty}</td>
                    <td>Rp. {val.total.toLocaleString()}</td>
                </tr>
            );
        })
    }


    render(){
        console.log(this.state.data)
        return(
            <div>
                <MDBTable striped bordered>
                    <MDBTableHead>
                        <tr>
                            <th>No.</th>
                            <th>Menu</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </MDBTableHead> 
                    <MDBTableBody>  
                        {this.renderCheckout()}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Rp. {this.renderTotal()}</td>
                        </tr>         
                    </MDBTableBody>            
                </MDBTable>
                <MDBBtn onClick={this.onBtnOrder}>Order</MDBBtn>
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
 
export default connect(mapStatetoProps, { login })(Checkout);