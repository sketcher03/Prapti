import { useEffect, useState } from 'react';
import "../../css/inbox.css";
import { useSelector } from 'react-redux';
import { setChats } from '../../redux/actions/chats';
import Store from "../../redux/store";

const Inbox = () => {

    const { isAuthenticated, isSeller, user, mode } = useSelector((state) => state.user);
    const { chats } = useSelector((state) => state.chats);

    const [error, setError] = useState("");

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setChats(setError));

    }, []);

    return (
        <div className='inbox-container'>
            <div>
                {
                    chats.map((chat) => (
                        <div key={chat._id}>
                            Chats
                        </div>
                    ))
                }
            </div>
            <div>
                Single Chat
            </div>
            <div>
                Chat Information
            </div>
        </div>
    )
}

export default Inbox