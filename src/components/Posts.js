import React, {useEffect, useRef} from 'react';
import "./Posts.css";
import InstagramEmbed from 'react-instagram-embed';
import {LoginContext} from "../Context/LoginContext";
import Post from './Post';
import Axios from 'axios';
import {baseUrl} from "../baseUrl";
import Suggestions from "./Suggestions";

//const axiosRe = axios.defaults;

const useDidMountEffect = (func, deps) => {

  const didMount = useRef(false);

  useEffect(()=>{
    if(didMount.current){ 
        func();
    }else{ 
       didMount.current = true;
   }

  }, deps);
  

}



function Posts() {

  const {posts, user, email, username, loggedIn}= React.useContext(LoginContext);
  const [postsvalue, setPosts] = posts;
  const [emailvalue, setEmail]=email;
  
  const [usernamevalue, setUsername]=username;
  const [uservalue, setUser]=user;
  const [isLoggedIn, setIsLoggedIn]=loggedIn;


    //runs once when the app runs
    useEffect( () => {
      //code runs here
      
     Axios.get(`${baseUrl}/api/posts/data/all`).then((response) =>{
      
      setPosts(
        
        response.data.sort((p1, p2)=>{
          
          return new Date(p2.createdAt) - new Date(p1.createdAt);
          
        })
        );
      })
      
    }, []);

    
  
    //runs once when the app runs n get the logged in user
    useEffect(() => {
      
      //code runs here
      if(isLoggedIn){

      Axios.get(
        `${baseUrl}/api/query/email/${emailvalue}`,
        
        
        { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } },
      ).then((response) => {
        setUser(response.data);
        
        setUsername(response.data.username);
      });
      }
      
    }, [isLoggedIn]);
  

    
    //get user timeline posts
    useDidMountEffect(() => {
      //code runs here
      if(uservalue){
          
        Axios.get(
        `${baseUrl}/api/posts/${uservalue._id}`,
        
        
        { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } },
      ).then((response) => {
        
        setPosts(response.data.sort((p1, p2)=>{
          
          return new Date(p2.createdAt) - new Date(p1.createdAt);
          
        })
        );

        
      });

      }
      
    }, [uservalue]);
  
  return (
    <div className='posts'>
{postsvalue!==null && uservalue!==null?
<>
<div className='app__posts'>
        {/*Posts */}
        
          {
                    
                    postsvalue.map((post) => (
                      <Post key={post._id} postUserId={post.userId} user={uservalue} postId={post._id} 
                      username={post.username} imageUrl={post.img} caption={post.desc} 
                      like={post.likes} commentsArray={post.comments} />
                    
                      ))
                  }

        
        
        
      </div>

      <div className='app__postsRight'>

        <Suggestions/>
       
      </div>
      </>
      :null
}
      
    </div>
  )
}

export default Posts