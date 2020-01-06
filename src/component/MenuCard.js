import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {API_URL} from '../support/apiUrl';
import '../styles/MenuCard.css'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const Breakfast = (props)=>{
        return(
            <div>
                
            </div>
            // <div className='d2'>
            //     <div className='menuCard'>
            //         <Link to={`/menu-detail?id=${props.id}`}>
            //             <div className='mcard'>
            //                 <h1 className='menuName'>{props.name}</h1>
            //                 <img src={props.image} className='imgCard' />
            //             </div>
            //         </Link>
            //     </div>
            // </div>
        )
}


export default Breakfast