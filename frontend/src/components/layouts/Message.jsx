import React, { useEffect, useState } from 'react'
import bus from '../../utils/bus';

import './Message.css';


function Message() {

  const [type, setType] = useState('');
  const [message, setMessage] = useState('')
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {

    bus.addListener('flash', ({message, type}) => {
      setMessage(message);
      setType(type);
      setVisibility(true);

      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  return (
    visibility && <div className={`message ${type}`}>{message}</div>
  )
}

export default Message