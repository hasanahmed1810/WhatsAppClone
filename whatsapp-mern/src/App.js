import React, {useEffect, useState} from 'react'
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import Pusher from 'pusher-js'
import axios from 'axios'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/messages/sync').then(response => {
      setMessages(response.data)
    })

    const pusher = new Pusher('a672f4921f21ae29c74c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages], newMessage)
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
