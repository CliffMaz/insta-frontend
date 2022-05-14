import React, {useContext, useState} from 'react';
import "./Header.css";
import audi from "./audi.png";
import {LoginContext} from "../../../Context/LoginContext";
import Axios from "axios";
import {baseUrl} from "../../../baseUrl";
import {Button} from "@mui/material";

function Header(props) {

  

  const userP= props.userDetails;
  


  const {user} = useContext(LoginContext);
  const [uservalue, setUser] = user;
  const [following, setFollowing]= useState(uservalue.following.includes(userP._id));
  const [followersCount, setFollowersCount] = useState(userP.followers.length);
  const [followingCount, setFollowingCount] = useState(userP.following.length);

  
  const followHandler = (e) =>{
    e.preventDefault()

    Axios.put(`${baseUrl}/api/query/follow`,
    {
      loggedInUser: uservalue._id,
      follow: userP._id
    },
    {
      headers:{"authtoken": `${localStorage.getItem("auth-token")}`}
    }
    ).then((res) => {

      console.dir(res.data.followed);
      if(res.data.followed && !res.data.unfollowed){
        
        setFollowing(true);
        
        setFollowersCount(followersCount + 1);
      }else if(!res.data.followed && res.data.unfollowed){
        setFollowing(false);
        
        setFollowersCount(followersCount - 1);
      }

    })
  }
 
  return (
      
    <div className="profile">

<div className="profile__avatar" alt="RafehQazi">
                <img  src={userP.profileDisplay}  width="150px" height="150px"/>
            </div>
            <div>
                <div className="profile__info">
                <div className="profile__username">
                    <p className="pro__name">{userP.username}</p>
                    {
                      userP._id===uservalue._id ? <Button variant="contained" color="success">Edit Profile</Button>:

                      
                      userP._id !==uservalue._id && !following ? <Button variant="contained" color="success" onClick={followHandler}>follow</Button>:
                      <Button variant="contained" color="success" onClick={followHandler}>following</Button>

                  
                    }

                  
                    
                </div>
                <div className="follow__">
                   <a className="follow_info">{props.postcount} posts</a> 
                   <a className="follow_info">{followersCount} followers</a>
                   <a className="follow_info">{followingCount} following</a>
                </div>
                </div>
                <div className="follow_info">
                    <p>{userP.bio}</p>
                </div>

            </div>
    </div>
    
  )
  
}

export default Header