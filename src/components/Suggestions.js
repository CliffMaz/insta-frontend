import React, {useState, useEffect} from 'react';
import Suggestion from './Suggestion';
import Axios from "axios";
import {baseUrl} from "../baseUrl";

function Suggestions() {


  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{

    Axios.get(`${baseUrl}/api/query/users`).then((res)=>{

      setSuggestions(res.data);

    })


  },[])

  return (
    <div>
        <p>Suggestion For You</p>

        {
          suggestions.map((s)=>(

            <Suggestion key={s._id} user={s}/>
          ))
        }
        
        
    </div>
  )
}

export default Suggestions