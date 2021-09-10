import React, { useState }from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import {AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic} from '@material-ui/icons'
import axios from 'axios'


function Chat(props) {

    const [input, setInput] = useState('')

    const sendMessage = async event => {
        event.preventDefault()

        await axios.post('http://localhost:9000/messages/new', {
            "message": input,
            "name": "hasan",
            "timestamp": "12:00",
            "received": false
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {props.messages.map((message) => 
                    <p className={`chat_message ${!message.received && "chat_receiver"}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>{message.timestamp}</span>
                    </p>
                )}
            </div>

            <div className='chat_footer'>
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(event) => setInput(event.target.value)}placeholder='Type a message' type='text'/>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
