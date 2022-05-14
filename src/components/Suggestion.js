import React, {useContext, useState} from 'react';
import { Avatar, Button } from '@material-ui/core';
import "./Suggestion.css";
import {LoginContext} from "../Context/LoginContext";
import Axios from "axios";
import {baseUrl} from "../baseUrl";
import {Link} from "react-router-dom";

function Suggestion(props) {

  const {user} = useContext(LoginContext);
  const [uservalue, setUser] = user;
  const [following, setFollowing]= useState(uservalue.following.includes(props.user._id));




  const followHandler = (e) =>{
    e.preventDefault()

    Axios.put(`${baseUrl}/api/query/follow`,
    {
      loggedInUser: uservalue._id,
      follow: props.user._id
    },
    {
      headers:{"authtoken": `${localStorage.getItem("auth-token")}`}
    }
    ).then((res) => {

      console.dir(res.data.followed);
      if(res.data.followed && !res.data.unfollowed){
        
        setFollowing(true);
        
       
      }else if(!res.data.followed && res.data.unfollowed){
        setFollowing(false);
        
        
      }

    })
  }

  return (
    <div className="suggestion">
        
        
<Link to={`profile/${props.user.username}`}>
<div className='suggestion__list'>
<Avatar src={props.user.profileDisplay} />

        <h6>{props.user.username}</h6>
              {

                props.user._id !==uservalue._id && !following ? <button onClick={followHandler}>follow</button>:
                <button onClick={followHandler}>following</button>
              }
        </div>
</Link>
            
        
    </div>
  )
}

export default Suggestion