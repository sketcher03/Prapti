import React, { useEffect } from 'react';
import '../../css/inbox.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSender, getSenderImage } from '../../config/ChatLogic';
import { server } from "../../../server";
import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../config/ChatLogic';

const SingleChat = () => {

    const { user } = useSelector((state) => state.user);
    const { selectedChat } = useSelector((state) => state.chats);

    //console.log(selectedChat.users);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");

    console.log(error);                                                                                                                                                                                                                                                                           

    const fetchMessages = async () => {
        if (!selectedChat)
        {
            return;
        }

        try {

            const url = `${server}/message/${selectedChat._id}`;

            await axios.get(url, { withCredentials: true })
                .then((res) => {
                    //console.log("Messages loaded");

                    setMessages(res.data.messages);
                    setError(res.data.message)

                    console.log(messages)

                })
                .catch((err) => {
                    setError(err.response.data.message);
                });
            

            //socket.emit("join chat", selectedChat._id);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {

        fetchMessages();
        //console.log(selectedChat)
        
    }, [selectedChat])

    const recieverID = (user?._id === selectedChat?.users[0]._id) ? selectedChat?.users[1]._id : selectedChat?.users[0]._id;

    console.log(selectedChat)

    const handleSendMessage = async (e) => {
        e.preventDefault();

        //socket.emit("stop typing", selectedChat._id);

        try {

            const url = `${server}/message`;

            await axios.post(url,
                {
                    text: newMessage,
                    chatID: selectedChat._id,
                    senderID: user._id,
                    recieverID: recieverID,
                },
                { withCredentials: true }
            )
                .then((res) => {
                    //console.log("Message Sent");

                    //socket.emit("new message", data);
                    setMessages([...messages, res.data.text]);
                    setError(res.data.message);
                    setNewMessage("");

                    console.log("Message Sent");

                })
                .catch((err) => {
                    setError(err.response.data.message);
                })

        } catch (error) {
            setError(error.message);
        }

    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };
    
    return (
        <div className='single-chat'>
            {
                (selectedChat) ? (
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

                            <h1 style={{ marginTop: "0px" }}>{getSender(user._id, selectedChat.users)}</h1>
                        </div>
                        <div style={{ overflowY: "scroll", height: "475px", padding: "10px 20px"}}>
                            {messages &&
                                messages.map((m, i) => (
                                    <div style={{ display: "flex" }} key={m._id}>
                                        
                                        {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                                            <Tooltip title={m.sender.display_name} arrow={true} placement="bottom-start">
                                                <Avatar
                                                    sx={{ width: "30px", height: "30px", cursor: "pointer", marginTop: "7px", marginRight: "-100%" }}
                                                    alt={m.sender.display_name}
                                                    src={`${server}/${m.sender.profilePic}`}
                                                />
                                            </Tooltip>
                                        )}

                                        <span
                                            style={{
                                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                                marginTop: isSameUser(messages, m, i, user._id) ? 5 : 10,
                                                borderRadius: "15px",
                                                padding: "6px 15px",
                                                maxWidth: "75%",
                                            }}
                                        >
                                            {m.text}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                        <form onSubmit={handleSendMessage} className='send-message'>
                            <input
                                style={{ width: "100%" }}
                                className='enter-message'
                                placeholder='Enter Message ...'
                                value={newMessage}
                                onChange={typingHandler}
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