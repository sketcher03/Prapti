import React from 'react';
import '../../css/inbox.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSender, getSenderImage } from '../../config/ChatLogic';
import { server } from "../../../server";
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const SingleChat = (select) => {

    const { user } = useSelector((state) => state.user);
    const { selectedChat } = useSelector((state) => state.chats);

    console.log(selectedChat.users);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    
    return (
        <div className='single-chat'>
            {
                (select) ? (
                    <div>
                        <div className='chat-header'>
                            {
                                selectedChat.users[1].profilePic ? (
                                    <Avatar
                                        sx={{ width: "40px", height: "40px" }}
                                        alt="Profile Picture"
                                        src={`${server}/${getSenderImage(user._id, selectedChat.users)}`}
                                    />
                                ) : (
                                    <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                                )
                            }

                            <h1 style={{ marginTop: "0px" }}>{getSender(user, selectedChat.users)}</h1>
                        </div>
                        <form className='send-message'>
                            <TextField
                                sx={{ width: "100%" }}
                                multiline
                                placeholder='Enter a Message ...'
                            />
                            <button className='sendbtn'>
                                <SendIcon/>
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Click on a Chat to Start a Conversation</h1>
                    </div>
                )
            }
        </div>
    )
}

export default SingleChat;