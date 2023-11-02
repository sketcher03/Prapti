import axios from "axios";
import { server } from "../../../server";

//set requests for a single user
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

//set all requests
export const setAllRequests = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetRequests",
        });

        const url = `${server}/requests/all`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetAllRequestsSuccess",
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


export const setAllRequestsAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetRequests",
        });

        //console.log("jndjskbfjsdfjdfbjsbfjsfb")

        const url = `${server}/requests/admin/all`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                console.log(res);
                dispatch({
                    type: "SetAllRequestsSuccess",
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



//create request
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
            //console.log(res);

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
                payload: res.data.request,
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

//delete request
export const deleteRequest = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "SetRequests",
        });
        
        await axios
            .delete(`${server}/requests/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);

                dispatch({
                    type: "DeleteRequestSuccess",
                    payload: res.data.request,
                });
            })
            .catch((err) => {
                
                dispatch({
                    type: "DeleteRequestFailure",
                    payload: err.response.data.message,
                });
            });
    }
    catch (error) {
        dispatch({
            type: "DeleteRequestFailure",
            payload: error.message,
        });
    }
    
};

//delete request admin
export const deleteRequestAdmin = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "SetRequests",
        });
        
        await axios
            .delete(`${server}/requests/admin/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);

                dispatch({
                    type: "DeleteRequestSuccess",
                    payload: res.data.request,
                });
            })
            .catch((err) => {
                
                dispatch({
                    type: "DeleteRequestFailure",
                    payload: err.response.data.message,
                });
            });
    }
    catch (error) {
        dispatch({
            type: "DeleteRequestFailure",
            payload: error.message,
        });
    }
    
};


//update request
export const editRequest = (editrequest, id, setData, setEmptyFields, setError) => async (dispatch) => {
    try {
      dispatch({
        type: "SetRequests",
      });

      //empty fields errors
      //console.log(editrequest);

      await axios
        .put(`${server}/requests/${id}`, editrequest, { withCredentials: true })
        .then((res) => {
          //console.log(res);

          setData({
            title: res.data.request.title,
            description: res.data.request.description,
            category: res.data.request.category,
            budget: res.data.request.budget,
            timeline: res.data.request.timeline,
          });

          setEmptyFields([]);

          setError(res.data.message);

          dispatch({
            type: "EditRequestSuccess",
            payload: res.data.request,
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
          setEmptyFields(err.response.data.emptyFields);

          dispatch({
            type: "EditRequestFailure",
            payload: err.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: "EditRequestFailure",
        payload: error.message,
      });
    }
  };