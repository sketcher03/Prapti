import { useEffect, useState } from 'react';
import '../../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { FiArrowRight } from "react-icons/fi";
import { setAllRequests , setAllRequestsAdmin} from '../../redux/actions/requests';
import { Link } from "react-router-dom";

//mui imports
import { DataGrid } from "@mui/x-data-grid";
import Chip from '@mui/material/Chip';

//components
import RequestDetails from '../../components/Request/RequestDetails';
import RequestForm from '../../components/Request/RequestForm';

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const AllRequests = () => {
  const { isSeller, mode } = useSelector((state) => state.user);
  const { allRequests } = useSelector((state) => state.requests)
  const [requestFormPopup, setRequestFormPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const { isAdminAuthenticated, admin } = useSelector((state) => state.admin);


  useEffect(() => {
    // console.log(requests);
    // console.log(user)
    if (isAdminAuthenticated) 
    {
      Store.dispatch(setAllRequestsAdmin());
    }
    else{
      Store.dispatch(setAllRequests());
    }

  }, []);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => { setOpen(true), setRequestId(params.row._id) }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "category",
      headerName: "Service",
      flex: 1,
    },
    {
      field: "timeline",
      headerName: "Timeline",
      flex: 1,
      renderCell: (params) => {
        return params.value + " days";
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
    {
      field: "user_username",
      headerName: "Published by",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color="secondary" />
      ),
    },
  ];

  //console.log(requestId)
  return (
    <div className="req-container">
      
      {(!isSeller && !isAdminAuthenticated) ? (
        <div>
          <p className="req-subheading">Can't find a Specific Service?</p>
          <h2 className="req-heading">Well... Look no further!</h2>
          <button
            className="requestbtn"
            onClick={() => setRequestFormPopup(true)}
          >
            Post a New Request <FiArrowRight />
          </button>
        </div>
      ): (
        ""
      )}

      <div className="requests">
        <h1>{(isSeller || isAdminAuthenticated) ? "All Requests" : "Your Requests"}</h1>
        <div className="requests-section">
          <DataGrid
            disableRowSelectionOnClick
            rowHeight={75}
            loading={!allRequests}
            getRowId={(row) => row._id}
            rows={allRequests || []}
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
        <RequestDetails
          requestID={requestId}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <RequestForm
        trigger={requestFormPopup}
        setTrigger={setRequestFormPopup}
      />
    </div>
  );
}

export default AllRequests;