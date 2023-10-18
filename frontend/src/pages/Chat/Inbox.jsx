import { useEffect, useState } from 'react';
import "../../css/inbox.css";
import { useSelector } from 'react-redux';
import { setChats, setSelectedChat } from '../../redux/actions/chats';
import Store from "../../redux/store";
import { getSender, getSenderImage } from '../../config/ChatLogic';
import Avatar from "@mui/material/Avatar";
import SingleChat from '../../components/Inbox/SingleChat';
import Badge from '@mui/material/Badge';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { server } from "../../../server";

const Inbox = () => {

    const { user } = useSelector((state) => state.user);
    const { chats, selectedChat } = useSelector((state) => state.chats);

    const navigate = useNavigate();

    //console.log(chats)

    const [error, setError] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        name: "",
        display_name: "",
        description: "",
        phoneNumber: 0,
        talents: [],
        profilePic: null,
        billingAddresses: [],
        role: "user",
        createdAt: null
    });
    const [userImage, setUserImage] = useState('');

    const recieverID = (user?._id === selectedChat?.users[0]._id) ? selectedChat?.users[1]._id : selectedChat?.users[0]._id;

    const handleSelectChat = (chat) => {
        //console.log("Chat selected");

        Store.dispatch(setSelectedChat(setError, chat));

        //console.log(isSelected)
    };


    const handleProfile = () => {
        
        navigate(`/profile/${recieverID}`)

    };

    

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setChats(setError));

        const url = `${server}/auth/getuser/${recieverID}`;

        axios.get(url, { withCredentials: true })
            .then((res) => {
                setUserData(res.data.user);
                setUserImage(res.data.user.profilePic);
            })
            .catch((error) => {
                setError(error.response.data.message)
            });

    }, [recieverID]);

    return (
        <div className='inbox-container'>
            <div className='chat-heads'>
                {
                    chats ? (
                        <div>
                            {
                                chats.map((chat) => (
                                    <div className='chat-head' onClick={() => handleSelectChat(chat)} key={chat._id}>
                                        {
                                            chat.users[1].profilePic ? (
                                                <Avatar
                                                    sx={{ width: "50px", height: "50px"}}
                                                    alt="Profile Picture"
                                                    src={`${server}/${getSenderImage(user._id, chat.users) }`}
                                                />
                                            ) : (
                                                <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
                                            )
                                        }

                                        <div>
                                            <h1 style={{ marginTop: "0px" }}>{getSender(user._id, chat.users).substring(0, 18) + "..."}</h1>

                                            {chat.latestMessage && (
                                                <p >
                                                    <b>{chat.latestMessage.sender.display_name} : </b>
                                                    {chat.latestMessage.text.length > 10
                                                        ? chat.latestMessage.text.substring(0, 11) + "..."
                                                        : chat.latestMessage.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            No Chats
                        </div>
                    )
                }
                
            </div>
            <div>
                <SingleChat />
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", marginRight: "500px"}}>
                <Badge badgeContent={userData.verified ? "Verified" : "Not Verified"} color={userData.verified ? "success" : "error"}>
                    {
                        userImage ? (
                            <Avatar
                                sx={{ width: "150px", height: "150px", marginBottom: "30px" }}
                                alt="Profile Picture"
                                src={`${server}/${userImage}`}
                            />
                        ) : (
                            <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
                        )
                    }

                </Badge>

                <h1 style={{ margin: "0px" }}>{userData.display_name}</h1>
                <h6 style={{ color: "grey", marginBottom: "15px" }}>@{userData.username}</h6>

                
                <Rating
                    sx={{
                        marginBottom: "20px"
                    }}
                    name="rating"
                    value={0}
                    precision={0.1}
                    readOnly
                    size="large"
                />
                <p style={{ textAlign: "center" }}>{userData.description}</p>
                <button onClick={handleProfile} className="profilebtn1" style={{ marginBottom: "0px", marginTop: "30px" }}>Visit My Profile</button>

            </div>
        </div>
    )
}

export default Inbox