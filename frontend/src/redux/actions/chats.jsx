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
                console.log("Chat API works");

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