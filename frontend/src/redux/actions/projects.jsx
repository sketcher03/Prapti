import axios from "axios";
import { server } from "../../../server";

//create project
export const createProject = (project, setData, setError, setImages, setCategory) => async (dispatch) => {
    try {
        dispatch({
            type: "SetProjects",
        });

        //empty fields errors
        console.log(project);

        await axios
            .post(`${server}/projects/create`, project, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);

                setCategory([""]);
                setImages([]);

                setData({
                    title: "",
                    category: [""],
                    description: "",
                    deliverables: [""],
                    priceTiers: [
                        {
                            tier_title: '',
                            tier_price: "",
                            tier_description: '',
                            tier_deliverables: '',
                        }
                    ],
                    requirements: [
                        {
                            req_title: "",
                            req_type: "",
                        }
                    ]
                });

                

                setError(res.data.message);

                dispatch({
                    type: "CreateProjectSuccess",
                    payload: res.data.project,
                });
            })
            .catch((err) => {
                setError(err.response.data.message);

                dispatch({
                    type: "CreateProjectFailure",
                    payload: err.response.data.message,
                });
            });
    } catch (error) {
        dispatch({
            type: "CreateProjectFailure",
            payload: error.message,
        });
    }
};
