import Store from "../../redux/store";
import { deleteRequest, deleteRequestAdmin, setAllRequestsAdmin } from "../../redux/actions/requests";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/PopupForm.css";
import { setAllRequests, setRequests } from '../../redux/actions/requests';
import { useEffect, useState } from 'react';

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ForwardIcon from '@mui/icons-material/Forward';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RequestDetails = (props) => {

  const { allRequests, requests } = useSelector((state) => state.requests);
  const { mode } = useSelector((state) => state.user);
  const { isAdminAuthenticated, admin } = useSelector((state) => state.admin);
  //console.log(requests)

  useEffect(() => {
    console.log(isAdminAuthenticated);
    // console.log(user)

    if (isAdminAuthenticated) {
      Store.dispatch(setAllRequestsAdmin());
    }
    else {
      if (mode === "seller") {
        Store.dispatch(setAllRequests());
      }
      else {
        Store.dispatch(setRequests());
      }
    }


  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDelete = async () => {

    if (isAdminAuthenticated) {
      Store.dispatch(deleteRequestAdmin(props.requestID));
    }
    else {
      Store.dispatch(deleteRequest(props.requestID));
    }

    handleClose();
  };

  //console.log(props.requestID)

  return (
    <div className="request-details">
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor: "#f0fff8",
            borderRadius: "20px",
            width: "750px",
            display: "flex",

          },
        }}
      >
        {mode === "seller" || isAdminAuthenticated ? (
          allRequests
            .filter((request) => request._id === props.requestID)
            .map((filteredRequest) => (
              <div className="request-each" key={filteredRequest._id}>
                <DialogTitle
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    margin: "20px 0px",
                  }}
                >
                  {filteredRequest.title}
                </DialogTitle>
                <DialogContent>
                  <p>
                    <strong>Description: </strong>
                    {filteredRequest.description}
                  </p>
                  <p>
                    <strong>Service: </strong>
                    {filteredRequest.category}
                  </p>
                  <p>
                    <strong>Budget: </strong>
                    {filteredRequest.budget}
                  </p>
                  <p>
                    <strong>Time (days): </strong>
                    {filteredRequest.timeline}
                  </p>
                  <p className="date">
                    Published{" "}
                    {formatDistanceToNow(new Date(filteredRequest.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-evenly", height: "100%", alignItems: "center", marginBottom: "60px" }}>
                  <button className="close-popup" onClick={handleClose}>
                    Close
                    <CloseIcon />
                  </button>
                  <Link
                    to={isAdminAuthenticated ? "/" : `/projects/update/${props.requestID}`}
                    className="edit-req"
                  >
                    {isAdminAuthenticated ? "Approve" : "Apply"}
                    <ForwardIcon /> 
                  </Link>
                  {isAdminAuthenticated ? (
                    <button className="delete-req" onClick={handleDelete}>
                    Delete
                    <DeleteForeverIcon />
                  </button>
                  ):
                  (
                    <button className="delete-req" >
                    Save
                    <FavoriteIcon />
                  </button> 
                  )} 

                </DialogActions>
              </div>
            ))
        ) : (
          requests
            .filter((request) => request._id === props.requestID)
            .map((filteredRequest) => (
              <div className="request-each" key={filteredRequest._id}>
                <DialogTitle
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    margin: "20px 0px",
                  }}
                >
                  {filteredRequest.title}
                </DialogTitle>
                <DialogContent>
                  <p>
                    <strong>Description: </strong>
                    {filteredRequest.description}
                  </p>
                  <p>
                    <strong>Service: </strong>
                    {filteredRequest.category}
                  </p>
                  <p>
                    <strong>Budget: </strong>
                    {filteredRequest.budget}
                  </p>
                  <p>
                    <strong>Time (days): </strong>
                    {filteredRequest.timeline}
                  </p>
                  <p className="date">
                    Published{" "}
                    {formatDistanceToNow(new Date(filteredRequest.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-evenly", height: "100%", alignItems: "center", marginBottom: "60px" }}>
                  <button className="close-popup" onClick={handleClose}>
                    Close
                    <CloseIcon />
                  </button>
                  <Link
                    to={`/requests/update/${props.requestID}`}
                    className="edit-req"
                  >
                    Edit
                    <EditIcon />
                  </Link>
                  <button className="delete-req" onClick={handleDelete}>
                    Delete
                    <DeleteForeverIcon />
                  </button>


                </DialogActions>
              </div>
            ))
        )}

        {props.children}

      </Dialog>
    </div>
  )

}

export default RequestDetails;