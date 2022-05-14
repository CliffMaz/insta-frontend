import React from 'react';
import './App.css';
import  {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import {LoginProvider} from "./Context/LoginContext";



function App() {
  
  return (
    <Router>
    <div className="app">

<LoginProvider>
      
      {/* Header */}
      <Nav />

     
      

      <Routes>
        <Route path="/" element={<Posts />}/>
         
      
      <Route path="/profile/:userProf" element={<Profile />}></Route>
        
      </Routes>
      
     
      </LoginProvider>
      
    </div>
    </Router>
  );
}

export default App;
