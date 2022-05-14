import React, {useState, useEffect} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase-conf";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Comment from "./Comment";
import  {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import likebtn from "../like.png";
import Axios from "axios";
import {baseUrl} from "../baseUrl";

function Post(props) {

    const likes= props.like;
    
    const liked=likes.includes(props.user._id);
    const [like, setLike] = useState(liked);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [comments, setComments] = useState(props.commentsArray);
    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(props.commentsArray.length);
    const [currentUser, setCurrentUser] = useState("");
    
  

     useEffect(()=>{
        Axios.get(`${baseUrl}/api/query/user/${props.postUserId}`, 
         { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } }).then((res)=>{

          setCurrentUser(res.data);
         })

     },[])
       

        const postComment = (e) => {
            e.preventDefault();


            Axios.put(`${baseUrl}/api/posts/comment/${props.postId}`, 
            {
              value: comment,
              userId: props.user._id},
            { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } }).then((res)=>{
  
              if(res.data.commit){
  
                setComments( [...comments, {
                  value: comment,
                  userId: props.user._id}]);
                setCommentCount(commentCount+1);
              }
            })
      
           
            setComment("");
          };

          const likeHandler = (e) => {
            e.preventDefault();
  
            Axios.put(`${baseUrl}/api/posts/like/${props.postId}`, {},
            { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } }).then((res)=>{
  
              if(res.data.like){
  
                setLike(true);
                setLikeCount(likeCount+1);
              }else{
                setLike(false);
                setLikeCount(likeCount-1);
              }
            })
  
          }

    return (
     


<div className="post" >
            <div className='post__header'>
            
            <Link to="/profile" ><Avatar
                className="post__avatar"
                alt="RafehQazi"
                src={currentUser.profileDisplay}
            /></Link>
            

              <Link to={`/profile/${props.username}`} > <h3>{props.username}</h3></Link>
            
           </div>
            {/* Header => avater and Username */}

            {/* image */}
            <img className='post__image' onDoubleClick={likeHandler}
                src={props.imageUrl}/>

<div className="post__like"> 
  {
    like ? <img className="like__btn" src={likebtn} alt="" onClick={likeHandler}/>:<FavoriteBorderOutlinedIcon onClick={likeHandler}></FavoriteBorderOutlinedIcon>
  }
            
           <p> {likeCount} likes</p>
        </div>
            {/* username and caption */}
            <h4 className='post__text'><strong>{props.username}:</strong> {props.caption}</h4>

            {/* comment section */}
            <div className="post__comments">
          {comments.map((com) => (
            
            <Comment userId={com.userId} text={com.value} />
          ))}
        </div>

        
        {props.user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
        </div>
     
       

        
    )
}

export default Post
