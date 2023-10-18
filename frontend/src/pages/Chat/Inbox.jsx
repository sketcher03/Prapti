import { useEffect, useState } from 'react';
import "../../css/inbox.css";
import { useSelector } from 'react-redux';
import { setChats, setSelectedChat } from '../../redux/actions/chats';
import Store from "../../redux/store";
import { getSender, getSenderImage } from '../../config/ChatLogic';
import { server } from "../../../server";
import Avatar from "@mui/material/Avatar";
import SingleChat from '../../components/Inbox/SingleChat';
import Badge from '@mui/material/Badge';
import Rating from '@mui/material/Rating';

const Inbox = () => {

    const { user } = useSelector((state) => state.user);
    const { chats, selectedChat } = useSelector((state) => state.chats);

    //console.log(chats)

    const [error, setError] = useState("");

    const handleSelectChat = (chat) => {
        //console.log("Chat selected");

        Store.dispatch(setSelectedChat(setError, chat));

        //console.log(isSelected)
    };

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setChats(setError));

    }, []);

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
            <div>
                {/* <Badge badgeContent={userData.verified ? "Verified" : "Not Verified"} color={userData.verified ? "success" : "error"}>
                    {
                        userImage ? (
                            <Avatar
                                sx={{ width: "200px", height: "200px", marginBottom: "30px" }}
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
                <button onClick={handleChat} className="profilebtn1" style={{ marginBottom: "0px", marginTop: "30px" }}>Contact Me</button> */}

            </div>
        </div>
    )
}

export default Inbox