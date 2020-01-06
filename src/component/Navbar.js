import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  { logout } from '../redux/action';

import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

onBtnLogout=()=>{
  localStorage.removeItem('username')
  this.props.logout()
}

render() {
  console.log(this.props.role)
  return (
    // <Router>
      <MDBNavbar dark className='navbar' expand="md">
        <Link to='/'>
          <MDBNavbarBrand className='navbar-brand'>
            <img className='nav-logo' src='https://static.ucraft.net/fs/userFiles/demo-burgerhigh/images/logo.png?v=1549876725'/>
          </MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav className='navbar-nav'>
            <MDBNavItem className='NavbarNavItem'>
              <MDBDropdown >
                <MDBDropdownToggle nav caret >
                  <span className="mr-2">Menu</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                <div className='Ditem Ditem2'><a href='/menu'>All Menu</a></div>
                  {/* <div divider />                   */}
                  <div className='Ditem'><a href='/menu-classic'>Classic</a></div>
                  <div className='Ditem'><a href='/menu-sides'>Sides</a></div>
                  <div className='Ditem'><a href='/menu-veggie'>Veggie</a></div>
                  <div className='Ditem'><a href='/menu-drinks'>Drinks</a></div>
                  <div className='Ditem'><a href='/menu-desert'>Desert</a></div>
                  {/* <Link to='/' onClick={this.onBtnLogout}><div className='Ditem'><a>Logout</a></div></Link> */}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem >
            {/* <MDBNavItem className='nav-item'>
              <MDBNavLink className='nav-link' to="/menu">Menu</MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem  className='NavbarNavItem'>
              <MDBNavLink to="#!">Location</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className='NavbarNavItem'>
              <MDBNavLink to="#!">Reward</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className='NavbarNavItem'>
              <MDBNavLink to="#!">Gift Card</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">News</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className='NavbarNavItem'>
              <MDBNavLink to="/cart"><FontAwesomeIcon icon='shopping-cart'/> Cart</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className='NavbarNavItem'>
              <MDBNavLink to="/user-profile"><FontAwesomeIcon icon='user'/>&nbsp;{this.props.username}</MDBNavLink>
            </MDBNavItem>            
          </MDBNavbarNav>          
        </MDBCollapse>
      </MDBNavbar>
    // </Router>
    );
  }
}
const mapStatetoProps = (state) => {
  return{
    username: state.user.username,
    role: state.user.role
  }
}

export default connect(mapStatetoProps, {logout})(NavbarPage);