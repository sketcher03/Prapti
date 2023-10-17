import axios from "axios";
import { server } from "../../../server";


//fetch chats
export const setChats = (setError) => async (dispatch) => {
    try {
        dispatch({
            type: "SetChats",
        });

        const url = `${server}/chat`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                console.log(res.data.chats);
                console.log(res.data.message);
                console.log("Fetch all chats API works");

                dispatch({
                    type: "SetChatsSuccess",
                    payload: res.data.chats,
                });

            })
            .catch((err) => {
                setError(err.response.data.message);

                dispatch({
                    type: "SetChatsFailure",
                    payload: err.response.data.message
                });
            })

        //console.log(projectData, userData);
    }
    catch (error) {
        setError(error.message);

        dispatch({
            type: "SetChatsFailure",
            payload: error.message
        });
    }
}

//set selected chat
export const setSelectedChat = (setError, chat) => async (dispatch) => {
    try {
        dispatch({
            type: "SetChats",
        });

        dispatch({
            type: "SetSelectedChatSuccess",
            payload: chat,
        });

        console.log("chat selected");

    } catch (error) {
        setError(error.message);

        dispatch({
            type: "SetChatsFailure",
            payload: error.message
        });
    }
}

//access chats
export const accessChats = (chats, setError, userDataID, userID) => async (dispatch) => {
    try {

        //console.log(userDataID);
        //console.log(userID);

        dispatch({
            type: "SetChats",
        });

        const url = `${server}/chat`;

        await axios.post(url, { userDataID, userID }, { withCredentials: true })
            .then((res) => {
                console.log(res.data.chat);
                console.log(res.data.message);
                console.log("Access chat API works");

                if (!chats.find((chat) => chat._id === res.data.chat._id)) {
                    dispatch({
                        type: "CreateChatSuccess",
                        payload: res.data.chat,
                    });
                }

                dispatch({
                    type: "SetSelectedChatSuccess",
                    payload: res.data.chat,
                });

            })
            .catch((err) => {
                setError(err.response.data.message);

                dispatch({
                    type: "SetChatsFailure",
                    payload: err.response.data.message
                });
            })

    }
    catch (error) {
        setError(error.message);

        dispatch({
            type: "SetChatsFailure",
            payload: error.message
        });
    }
}