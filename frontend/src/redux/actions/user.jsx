import axios from "axios";
import { server } from "../../../server";

//save user
export const saveUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "SaveUserRequest"
        })

        const url = `${server}/auth/saveuser`;

        await axios.get(url, {withCredentials: true})
        .then((res) => {
            dispatch({
                type: "SaveUserSuccess",
                payload: res.data.user
            });
        })
        .catch((error) => {
            dispatch({
                type: "SaveUserFailure",
                payload: error.response.data.message
            });
        });
    }
    catch (err) {
        dispatch({
            type: "SaveUserFailure",
            payload: err.response.data.message
        });
    }
}

//logout
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "SaveUserRequest"
        })

        const url = `${server}/auth/logout`;

        await axios.post(url, {}, {withCredentials: true})
        .then((res) => {
            dispatch({
                type: "LogoutSuccess",
                payload: res.data.user
            });
        })
        .catch((error) => {
            dispatch({
                type: "LogoutFailure",
                payload: error.response.data.message
            });
        });
    }
    catch (err) {
        dispatch({
            type: "LogoutFailure",
            payload: err.response.data.message
        });
    }
}