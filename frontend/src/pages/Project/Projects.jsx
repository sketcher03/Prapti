import { useEffect, useState } from 'react';
import '../../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { setProjects } from "../../redux/actions/projects";
import Chip from '@mui/material/Chip';

//mui imports
import { DataGrid } from "@mui/x-data-grid";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

//components
import ProjectDetails from '../../components/Project/ProjectDetails';


const Projects = () => {
    const { mode } = useSelector((state) => state.user);
    const { projects } = useSelector((state) => state.projects);
    const [projectId, setProjectId] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setProjects());

    }, []);

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            renderCell: (params) => (
                <Link onClick={() => { setOpen(true), setProjectId(params.row._id) }}>
                    {params.value}
                </Link>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            // renderCell: (params) => (
            //     <Chip label={params.value} color="secondary" />
            // ),
        },
        {
            field: "verified",
            headerName: "Approval Status",
            flex: 1,
            renderCell: (params) => (
                <Chip label={(params.value === false) ? "Pending" : "Approved"} color={(params.value === false) ? "warning" : "success" } />
            ),
        },
        {
            field: "createdAt",
            headerName: "Published",
            flex: 1,
            renderCell: (params) => {
                return formatDistanceToNow(new Date(params.value), {
                    addSuffix: true,
                });
            },
        },
    ];

    const handleNewProject = () => {
        navigate('/project/starter');
    }

    return (
        <div className="req-container">

            {!(mode === "seller") ? (

                <button
                    className="projectbtn"
                    onClick={handleNewProject}
                >
                    Post a New Project<FiArrowRight />
                </button>
            ) : (
                ""
            )}

            <div className="requests">
                <h1>My Projects</h1>
                <div className="requests-section">
                    <DataGrid
                        disableRowSelectionOnClick
                        rowHeight={75}
                        loading={!projects}
                        getRowId={(row) => row._id}
                        rows={projects || []}
                        columns={columns}
                        sx={{
                            m: 2,
                            fontFamily: "Poppins",
                            "& .MuiDataGrid-cell": {
                                paddingLeft: "40px",
                                cursor: "pointer",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                paddingLeft: "30px",
                                fontWeight: "bolder",
                            },
                        }}
                    />
                    {/* {requests &&
              requests.map((request) => (
                <RequestDetails key={request._id} request={request} />
              ))} */}
                </div>
                <ProjectDetails
                    projectID={projectId}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </div>
    );
}

export default Projects;