import { useEffect, useState } from 'react';
import '../../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { setProjects } from "../../redux/actions/projects"

//mui imports
import { DataGrid } from "@mui/x-data-grid";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

//components
import ProjectDetails from '../../components/Project/ProjectDetails';

const Projects = () => {
    //const { isAuthenticated, user } = useSelector((state) => state.user);
    const { projects } = useSelector((state) => state.projects)
    const [projectId, setProjectId] = useState("");
    const [open, setOpen] = useState(false);


    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setProjects());

    }, [projects]);

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
        },
        {
            field: "verified",
            headerName: "Approval Status",
            flex: 1,
            renderCell: (params) => {
                return (params.value === false) ? "Pending" : "Approved";
            },
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

    //console.log(requestId)
    return (
        <div className="req-container">

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