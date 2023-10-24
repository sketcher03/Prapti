import { server } from "../../../server";
import axios from "axios";


//set all complaints from a single user
export const setComplaints = () => async (dispatch) => {
    try{
        dispatch({
            type: "SetComplaints",
        });

        const url = `${server}/help/complaint`;

        await axios.get(url, {withCredentials: true})
            .then ((res) => {
               //console.log("complaints are here")
                dispatch ({
                type:"SetComplaintsSuccess",
                payload: res.data.complaints,
            })

        })
        .catch((error) => {
            dispatch({
                type: "SetComplaintsFailure",
                payload : error.response.data.message,
            });
        });
    }
    catch(error){
        dispatch({
            type: "SetComplaintsFailure",
            payload : error.response.data.message,
        })
    }
}