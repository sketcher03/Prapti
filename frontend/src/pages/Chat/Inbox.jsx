import { useEffect, useState } from 'react';
import "../../css/inbox.css";
import { useSelector } from 'react-redux';
import { setChats, setSelectedChat } from '../../redux/actions/chats';
import Store from "../../redux/store";
import { getSender, getSenderImage } from '../../config/ChatLogic';
import { server } from "../../../server";
import Avatar from "@mui/material/Avatar";
import SingleChat from '../../components/Inbox/SingleChat';

const Inbox = () => {

    const { user } = useSelector((state) => state.user);
    const { chats } = useSelector((state) => state.chats);

    //console.log(chats)

    const [error, setError] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setChats(setError));

    }, []);

    const handleSelectChat = (chat) => {
        //console.log("Chat selected");

        Store.dispatch(setSelectedChat(setError, chat));

        setIsSelected(true);

        console.log(isSelected)
    };

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
                                                    <b>{chat.latestMessage.sender.name} : </b>
                                                    {chat.latestMessage.content.length > 50
                                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                                        : chat.latestMessage.content}
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
                <SingleChat select={isSelected} />
            </div>
            <div>
                Chat Information
            </div>
        </div>
    )
}

export default Inbox