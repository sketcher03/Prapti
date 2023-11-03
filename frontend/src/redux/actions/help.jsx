import { server } from "../../../server";
import axios from "axios";


//set all complaints from a single user
export const setComplaints = (id, toast) => async (dispatch) => {
    try {
        dispatch({
            type: "SetComplaints",
        });

        const url = `${server}/help/complaint/${id}`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                toast.success("All Complaints Loaded");

                dispatch({
                    type: "SetComplaintsSuccess",
                    payload: res.data.complaints,
                })

            })
            .catch((error) => {
                toast.error(error.response.data.message);

                dispatch({
                    type: "SetComplaintsFailure",
                    payload: error.response.data.message,
                });

            });
    }
    catch (error) {
        toast.error(error.message);
        dispatch({
            type: "SetComplaintsFailure",
            payload: error.message,
        })
    }
}