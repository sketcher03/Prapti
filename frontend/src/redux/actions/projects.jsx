import axios from "axios";
import { server } from "../../../server";

//set projects
export const setProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetProjects",
        });

        const url = `${server}/projects`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetProjectsSuccess",
                    payload: res.data.projects,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "SetProjectsFailure",
                    payload: error.response.data.message,
                });
            });
    }
    catch (err) {
        dispatch({
            type: "SetProjectsFailure",
            payload: err.response.data.message,
        });
    }
};

//set all projects
export const setAllProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetProjects",
        });

        const url = `${server}/projects/all`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetAllProjectsSuccess",
                    payload: res.data.projects,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "SetProjectsFailure",
                    payload: error.response.data.message,
                });
            });
    }
    catch (err) {
        dispatch({
            type: "SetProjectsFailure",
            payload: err.response.data.message,
        });
    }
};

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

//delete project
export const deleteProject = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "SetProjects",
        });

        await axios
            .delete(`${server}/projects/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);

                dispatch({
                    type: "CreateProjectSuccess",
                    payload: res.data.project,
                });
            })
            .catch((err) => {

                dispatch({
                    type: "DeleteProjectFailure",
                    payload: err.response.data.message,
                });
            });
    }
    catch (error) {
        dispatch({
            type: "DeleteProjectFailure",
            payload: error.message,
        });
    }

};