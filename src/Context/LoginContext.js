import React, { createContext, useState } from "react";


export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  
  return (
    <LoginContext.Provider value={{posts:[posts, setPosts], 
    user:[user, setUser], email:[email, setEmail],
    username:[username,setUsername], password:[password,setPassword], loggedIn: [isLoggedIn, setIsLoggedIn]}}>
      {props.children}
    </LoginContext.Provider>
  );
};
