import React, {Component} from 'react';
import Axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import sign_In from './pages/sign_In';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Menu from './foodMenu/Menu';
import MenuDetail from './foodMenu/MenuDetail';
import MenuClassic from './foodMenu/Menu-Classic';
import MenuSides from './foodMenu/Menu-Sides';
import MenuVeggie from './foodMenu/Menu-Veggie';
import menuDrinks from './foodMenu/Menu-Drinks';
import menuDesert from './foodMenu/Menu-Desert';
import NotFound from './pages/NotFound';
import Footer from './component/Footer';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import {API_URL} from './support/apiUrl';
import { connect } from 'react-redux';
import { login } from './redux/action';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faUser,
  faHome, faShoppingCart, faTimes

} from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faUser , faHome, faShoppingCart , faTimes);


class App extends Component{
  componentDidMount(){
    var username = localStorage.getItem('username');
    if(username){
      Axios.get(API_URL+`/Users?username=${username}`)
      .then((res)=>{
        console.log(res.data)
        this.props.login(res.data[0])
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  render(){
    return(
      <div>
        <Navbar/>
        <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/sign_In' component={sign_In}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/menu-detail' component={MenuDetail}/>
        <Route path='/menu-classic' component={MenuClassic}/>
        <Route path='/menu-sides' component={MenuSides}/>
        <Route path='/menu-veggie' component={MenuVeggie}/>
        <Route path='/menu-drinks' component={menuDrinks}/>
        <Route path='/menu-desert' component={menuDesert}/>
        <Route path='/user-profile' component={UserProfile}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='*' component={NotFound}/>
        </Switch>
        <Footer/>

      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return{
    username: state.user.username,
    role: state.user.role
  }
}

export default connect(mapStatetoProps, {login})(App);