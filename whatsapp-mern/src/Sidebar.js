import React from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import { DonutLarge, MoreVert, Chat, SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src=""/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search or start a new chat" type="text"/>
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
