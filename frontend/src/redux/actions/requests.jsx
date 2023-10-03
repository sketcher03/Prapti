import axios from "axios";
import { server } from "../../../server";

//set requests
export const setRequests = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetRequests",
        });

        const url = `${server}/requests`;

        await axios.get(url, { withCredentials: true })
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
};

export const createRequest = (request, setData, setEmptyFields, setError, props) => async (dispatch) => {
  try {
    dispatch({
      type: "SetRequests",
    });

    //empty fields errors
    console.log(request);

    await axios
        .post(`${server}/requests`, request, { withCredentials: true })
        .then((res) => {
            console.log(res);

            setData({
            title: "",
            description: "",
            category: "",
            budget: "",
            timeline: "",
            });

            setEmptyFields([]);
            props.setTrigger(false);

            setError(res.data.message);

            dispatch({
            type: "CreateRequestSuccess",
            payload: res.data.requests,
            });
        })
        .catch((err) => {
                setError(err.response.data.message);
                setEmptyFields(err.response.data.emptyFields);
                    
                dispatch({
                type: "CreateRequestFailure",
                payload: err.response.data.message,
                });
        });
    } catch (error) {
        dispatch({
            type: "CreateRequestFailure",
            payload: error.message,
        });
    }
};