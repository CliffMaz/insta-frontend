import React from 'react';
import "./Photos.css";
import Photo from "./Photo";

function Photos(props) {

  
  return (
    <div className='photos__body'>

    {
      props.userPosts.map((p) =>(

        <Photo key={p._id} pic={p.img} />
      ))
    }
      
      
    </div>
  )
}

export default Photos