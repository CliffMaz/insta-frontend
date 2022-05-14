import React from 'react'

function Comment(props) {

    
  return (
    <p>
              <b>{props.userId}</b> {props.text}
            </p>
  )
}

export default Comment