import React, {useState, useEffect, useRef} from 'react'
import './Nav.css';
import {auth} from '../firebase-conf';
import {Button, makeStyles, Modal, Input} from "@material-ui/core";
import ImageUpload from './ImageUpload';
import UploadOutlined from '@mui/icons-material/FileUploadOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import {LoginContext} from "../Context/LoginContext";
import Axios from 'axios';
import {baseUrl} from "../baseUrl";
import {Link, Redirect} from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
//hooks
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 320,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Nav() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [password, setPassword] = useState("");
  
  const {user, email, username, loggedIn}= React.useContext(LoginContext);
  
  const [emailvalue, setEmail]=email;
  const [usernamevalue, setUsername]=username;
  const [uservalue, setUser]=user;
  const [isLoggedIn, setIsLoggedIn]=loggedIn;
  const loginFailed= false;
  
  //useEffect: runs a peace of code based on a specific condition


  useEffect(() =>{

    
  }, [emailvalue]);


  const handleLogin = (e) => {
    e.preventDefault();
    
    
        Axios.post(`${baseUrl}/api/user/login`, {
              email: emailvalue,
              password: password
            }).then((response) => {
              if(response.data!=="Email or password is incorrect"){
                
                setIsLoggedIn(true);
                localStorage.setItem("auth-token", response.data);
                setOpen(false);
                
               }
                
              
            });
    
    


    
  };


  const logout= (e) => {
    e.preventDefault();

    
    
    setIsLoggedIn(false);
    setUser(null);
    
  }

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(emailvalue, password)
      .then((authUser) => {
       return authUser.user.updateProfile({
          displayName: usernamevalue
        })
      })
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };

  return (
    <div>

        
 {/* Modal for login */}
 <Modal open={open} onClose={() => setOpen(false)}>
 <div style={modalStyle} className={classes.paper}>
   <form className="app__login">
     <center>
       <img
         className="app__headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt=""
       />
     </center>

  <Input
       placeholder="email"
       type="text"
       value={emailvalue}
       onChange={(e) => setEmail(e.target.value)}
     />
     <Input
       placeholder="password"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     <Button onClick={handleLogin}>Login</Button>
     <Button onClick={() => setOpen(false)}>Cancel</Button>
    
     
   </form>
 </div>
</Modal>

{/* Modal for registration */}
<Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
 <div style={modalStyle} className={classes.paper}>
   <form className="app__login">
     <center>
       <img
         className="app__headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt=""
       />
     </center>
     <Input
       type="text"
       placeholder="username"
       value={usernamevalue}
       onChange={(e) => setUsername(e.target.value)}
     />
     <Input
       placeholder="email"
       type="text"
       value={emailvalue}
       onChange={(e) => setEmail(e.target.value)}
     />
     <Input
       placeholder="password"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     <Button onClick={handleRegister}>Register</Button>
     <Button onClick={() => setRegisterOpen(false)}>Cancel</Button>
   </form>
 </div>
</Modal>


<div className="app__header">
        <img className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="logo image"/>

      <div className='app__headerLeft'>

      <Link to="/"><CottageOutlinedIcon className='header__icons'></CottageOutlinedIcon></Link>
        {uservalue?.username ? (
                <div> 
                    <UploadOutlined className='header__icons' onClick = {() => {setImageUploadOpen(true)}}></UploadOutlined>
                    <ImageUpload imageUploadOpen={imageUploadOpen} setImageUploadOpen={setImageUploadOpen} username={user.username}/>
                  </div>
                  ):(
        <h3></h3>
      )}

          {//conditional rendering
        uservalue ? (
          <Button onClick = {logout}><Link to="/">Log Out</Link></Button>
        
      ):(
        <div className="app__loginContainer">
          <Button onClick={() => setOpen(true)}>Login</Button>
          <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
        </div>
        
      )}
      </div>
       
      </div>
    </div>
  )
}

export default Nav