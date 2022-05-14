import { paginationClasses } from '@mui/material';
import React from 'react';
import "./Photo.css";
import pic from "./header/audi.png";

function Photo(props) {
  return (
    <div >
     <img className='photo__post' src={props.pic} alt="post"/>
    </div>
  )
}

export default Photo