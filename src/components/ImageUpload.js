import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {baseUrl} from "../baseUrl";
import {LoginContext} from "../Context/LoginContext";
import Axios from 'axios';
import {Button, makeStyles, Modal, Input} from "@material-ui/core";
import {storage, db} from '../firebase-conf';
import './ImageUpload.css';

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
      width: 400,
      height: 200,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
function ImageUpload({imageUploadOpen,setImageUploadOpen, username}) {

  const {user, posts}= React.useContext(LoginContext);
    const [uservalue, setUser] = user;
    const [postsvalue, setPosts] = posts;
    const [caption, setCaption] = useState("");
    const classes = useStyles();
    const [image, setImage] = useState(null);
    const [progress,setProgress]= useState(0);
    const [modalStyle] = useState(getModalStyle);
    const [url, setUrl] = useState("");

    const handleUploadChange = (e) => {

        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleShare = () => {

            const uploadTask = storage.ref(`images/${image.name}`).put(image)

            uploadTask.on(
                "status_changed",
                (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
            setProgress(progress);
            },
            (err) => {
                console.log(err);
                alert(err.message);
            },
            () => {

                //when completed
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    setUrl(url);
                    Axios.post(`${baseUrl}/api/posts/`,{
                            userId: uservalue._id,
                            desc: caption,
                            img: url,
                            username: uservalue.username,
                            
                        }, { headers: { "authtoken": `${localStorage.getItem("auth-token")}` } }).then((res)=>{

                          setPosts([res.data, ...postsvalue]);
                        }
        
        
                        );

                    setImageUploadOpen(false);
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
                
            
            }
            
        );
    };
    return (
        <div>
            <Modal open={imageUploadOpen} onClose={() => setImageUploadOpen(false)}>
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
              placeholder="upload"
              type="file"
             
              onChange={handleUploadChange}
            />
            <Input
              placeholder="Enter a caption..."
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          <progress className="imageupload__progress" value={progress} max="100" />  
           
            <Button onClick={handleShare}>Share</Button>
            <Button onClick={() => setImageUploadOpen(false)}>Cancel</Button>
          </form>
        </div>
      </Modal>
        </div>
    )
}

export default ImageUpload
