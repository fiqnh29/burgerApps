import React, { Component } from 'react';
import { connect } from 'react-redux';
import {login} from '../redux/action';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import { MDBBtn, MDBInput } from "mdbreact";
import '../styles/sign_In.css'


class sign_In extends Component{
    loginUser = () => {
        var username = this.text.value;
        var password = this.pass.value
        if(username === ''|| password === ''){
            alert('Masukan Username & Password')
        }else{
            Axios.get(`http://localhost:2000/Users?username=${username}&password=${password}`,{
                username,
                password 
            })
            .then((res)=>{
                if(res.data.length === 0){
                    return alert('username atau password salah')
                }else{
                    // console.log(res.data)
                    localStorage.setItem("username", username)
                    this.props.login(res.data[0])
                    // return alert('welcome')      
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }


    render(){
        console.log(this.props.username)
        if(this.props.username !=='' && this.props.role === 'user'){
            return(            
                <Redirect to='/'/>
            )
        }else if(this.props.username !=='' && this.props.role === 'admin'){
            return(
                <Redirect to='/admin'/>
            )
        }
        return(
            <div>
                <div className='container'>
                    <div className='inputBox'>
                        <h3 style={{fontWeight:'bold', textAlign:'center'}}>Sign In</h3>
                        <MDBInput type='text' label="Username" icon="user" inputRef={(text)=> this.text = text} />
                        <MDBInput type='password' label="Password" icon="lock" inputRef={(pass)=> this.pass = pass} />
                        <MDBBtn outline gradient="blue" onClick={this.loginUser}>Login</MDBBtn>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}

export default connect(mapStatetoProps, {login})(sign_In)