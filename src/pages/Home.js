import React, { Component } from 'react';
import Axios from 'axios';
import { Link , Redirect } from 'react-router-dom';
import {API_URL} from '../support/apiUrl';
import Carousel from './Carousel';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,
    MDBContainer, MDBRow } from 'mdbreact';
import '../styles/Home.css';

class Home extends Component {
    state = { 
        data: []
     }

    componentDidMount(){
        Axios.get(API_URL +`/Menu`)
        .then((res) => {
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCard=()=>{
        let data = this.state.data
        return data.map((val)=>{
            return(
                // <div>
                    <ul className='mBox'>
                        <li className='lBox'>
                            <div className='container-menu'>
                            <Link to={val.linkTo}>
                                <img className='menuImg' src={val.image}/>
                                <div className='overlay'>
                                    <div className="text">{val.menu}</div>
                                </div>
                            </Link>
                            </div>
                        </li>
                    </ul>
                // </div>
            )
        })
    }
    render(){
        return(
            <div>
                <Carousel/>
                {/* {this.renderCard()} */}
            </div>
        )
    }
}

 
export default Home