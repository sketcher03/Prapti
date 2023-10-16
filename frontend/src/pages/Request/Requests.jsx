import { useEffect, useState } from 'react';
import '../../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { FiArrowRight } from "react-icons/fi";
import { setRequests } from '../../redux/actions/requests';
import { Link } from "react-router-dom";

//mui imports
import { DataGrid } from "@mui/x-data-grid";


//components
import RequestDetails from '../../components/RequestDetails';
import RequestForm from '../../components/RequestForm';

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const Requests = () => {
  const { isSeller } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.requests)
  const [requestFormPopup, setRequestFormPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState("");


  useEffect(() => {
    // console.log(requests);
    // console.log(user)
    Store.dispatch(setRequests());

  }, [requests]);

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
  ];

  //console.log(requestId)
  return (
    <div className="req-container">
      
      {!isSeller ? (
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
        <h1>Your Requests</h1>
        <div className="requests-section">
          <DataGrid
            disableRowSelectionOnClick
            rowHeight={75}
            loading={!requests}
            getRowId={(row) => row._id}
            rows={requests || []}
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

export default Requests;