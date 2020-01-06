import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {API_URL} from '../support/apiUrl';
import '../styles/Menu.css'
import MenuCard from '../component/MenuCard';
import { MDBContainer, MDBCard, MDBCardImage, MDBRow, MDBCol,
    MDBCardBody, MDBCardTitle, MDBCardText,
    MDBNav, MDBNavItem, MDBNavLink
} from "mdbreact";
class Classic extends Component{
    state = { 
        data: []
     }

    componentDidMount(){
        Axios.get(API_URL +`/Menu?menuType=Classic`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // mapping=()=>{
    //     let mt = this.state.data
    //     return mt.map((val)=>{
    //         return val.menuType
    //     })
    // }

    renderMenu=()=>{     
        return this.state.data.map((val, index) => {
            return(
                <Link to={`/menu-detail?id=${val.id}`}>
                    <div className='cardBox'>
                        <h1 className='menu-price '>{val.name}</h1>
                        <img className='MimgCard' src={val.image} />
                        <h1 className='menu-price MP'>Rp. {val.price.toLocaleString()}</h1>
                    </div>
                </Link>

            )
        })
    }

    renderMenuList=()=>{
        // return this.state.data.map((val1)=>{
            // let menuType = this.val.id
            // console.log(this.mapping())
            return(
                // <BrowserRouter>
                <MDBNav className="justify-content-center Menu-Nav">
                <MDBNavItem>
                    <Link to={`/menu-classic`}><h3 className='Menu-nav-item' style={{color:'orange'}}>Classic</h3></Link>
                </MDBNavItem>
                <MDBNavItem>
                    <Link  to={`/menu-sides`}><h3 className='Menu-nav-item'>Sides</h3></Link>
                </MDBNavItem>
                <MDBNavItem>
                    <Link  to={`/menu-veggie`}><h3 className='Menu-nav-item'>Veggie</h3></Link>
                </MDBNavItem>
                <MDBNavItem>
                    <Link to={`/menu-drinks`}><h3 className='Menu-nav-item'>Drinks</h3></Link>
                </MDBNavItem>
                <MDBNavItem>
                    <Link to={`/menu-desert`}><h3 className='Menu-nav-item'>Desert</h3></Link>
                </MDBNavItem>
                </MDBNav>
                // </BrowserRouter>
            )

        // })
    }

    render(){
        return(
            <div className='con'> 
                {this.renderMenuList()}
                <div className='clearfix'>
                    {this.renderMenu()}           
                </div>
            </div>
        )
    }
}

export default Classic