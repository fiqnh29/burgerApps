import React, {Component} from 'react';
import {login , logout} from '../redux/action';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {API_URL} from '../support/apiUrl';
import {MDBBtn} from 'mdbreact';
import '../styles/UserProfile.css'


class UserPages extends Component{

    state={
        data:[]
    }

    componentDidMount(){
        let username = localStorage.getItem('username')
        console.log(username)
        Axios.get(API_URL +`/Users?username=${username}`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    notLogin=()=>{
        return(
            <div className='UPcontainer'>
                <div className='UPcon-img'>
                    <img className='UPimg' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'/>
                </div>
                <div className='UPcon-txt'>
                    <h1 className='UPtxt'>You are not logged in please login first or register!</h1>
                    <Link to='/sign_In'><MDBBtn gradient="peach" className='UPnotlog-btn'>Sign In</MDBBtn></Link>
                    <Link to='/sign_In'><MDBBtn gradient="blue" className='UPnotlog-btn'>Sign Up</MDBBtn></Link>
                </div>
            </div>
        )
    }

    onBtnLogout=()=>{
        localStorage.removeItem('username')
        this.props.logout()
    }

    renderProfile=()=>{
        return this.state.data.map((val)=>{
            return(
                <div className='UPL-clearfix'>
                    <div className='UPL-pic-con'><img src={val.picture} className='UPL-picture' />
                    {/* <MDBBtn outline color="warning" className='UPlog-btn'>Change Picture</MDBBtn>
                    <Link to='/'><MDBBtn onClick={this.onBtnLogout} className='UPlog-btn' outline color="warning">Logout</MDBBtn></Link>
                     */}
                    </div>
                    <div className='UPL-cardBox'>   
                        <p className='UPL-a'>Name</p><p className='UPL-b'>: {val.username}</p>
                        <p className='UPL-a'>Email</p><p className='UPL-b'>: {val.email}</p>
                        <p className='UPL-a'>Password</p><p className='UPL-b'>: {val.password}</p>
                    <MDBBtn outline color="warning" className='UPlog-btn'>Change Picture</MDBBtn>
                    <Link to='/'><MDBBtn onClick={this.onBtnLogout} className='UPlog-btn' outline color="warning">Logout</MDBBtn></Link>
                    </div>
                </div>
            )
        })

    }
    
    render(){
        let data = this.state.data
        console.log(data)
        if(this.props.username === ''){
            return(
                <div className='UPnotlog-con'>
                    {this.notLogin()}
                </div>
            )
        }
        else{
            return(
                <div className='UPL-container'>
                    <h1 className='UPL-title'>User Profile</h1>
                    {this.renderProfile()}
                </div>
            )

        }
    }
}

const mapStatetoProps = (state) => {
    return{
      username: state.user.username,
      role: state.user.role
    }
  }
  
export default connect(mapStatetoProps, {login, logout})(UserPages);