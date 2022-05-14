import React, {useState, useEffect} from 'react';
import Header from "./header/Header";
import Photos from "./Photos";
import {LoginContext} from '../../Context/LoginContext'
import Axios from 'axios';
import {baseUrl} from "../../baseUrl";
import {useParams} from "react-router-dom";


function Profile() {

 
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() =>{

   
    Axios.get(`${baseUrl}/api/posts/profile/${params.userProf}`,  
    { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } }).then((res)=>{

      setUser(res.data.user[0]);
      setPosts(res.data.posts.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
      console.log("followers: "+res.data.user[0].following.length);
      
    })
  },[])

  return (
    <div className="header">
     { user!==null ?
       <>
       <Header className="header__info" userDetails={user} postcount={posts.length}/>
      <Photos className="user__posts" userPosts={posts} />
       </>
        
      :null
      
}
    </div>
  )
}

export default Profile