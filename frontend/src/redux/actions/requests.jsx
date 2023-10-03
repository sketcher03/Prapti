import axios from "axios";
import { server } from "../../../server";

//set requests
export const setRequests = () => async (dispatch) => {
    try {
        dispatch({
          type: "SetRequests",
        });

        const url = `${server}/requests`;

        await axios.get(url, {withCredentials: true})
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetRequestsSuccess",
                    payload: res.data.requests,
                });
        })
        .catch((error) => {
            dispatch({
                type: "SetRequestsFailure",
                payload: error.response.data.message,
            });
        });
    }
    catch (err) {
        dispatch({
            type: "SetRequestsFailure",
            payload: err.response.data.message,
        });
    }
}