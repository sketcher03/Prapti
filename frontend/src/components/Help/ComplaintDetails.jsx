import Store from "../../redux/store";
import { deleteRequest, deleteRequestAdmin, setAllRequestsAdmin } from "../../redux/actions/requests";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setComplaints } from '../../redux/actions/help';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/PopupForm.css";
//import { setComplaints } from '../../redux/actions/help';
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

const ComplaintDetails = (props) => {

  const { complaints } = useSelector((state) => state.help);
  const { isAdminAuthenticated } = useSelector((state) => state.admin);
  //console.log(requests)

  /* useEffect(() => {
     console.log(isAdminAuthenticated);
     // console.log(user)
 
     if (isAdminAuthenticated) {
       Store.dispatch(setAllRequestsAdmin());
     }
     else {
       if (mode === "user") {
         Store.dispatch(setAllRequests());
       }
       else {
         Store.dispatch(setRequests());
       }
     }
     
     
   }, []);*/

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDelete = async () => {

    /*if (isAdminAuthenticated) {
      Store.dispatch(deleteRequestAdmin(props.requestID));
    }
    else{
      Store.dispatch(deleteRequest(props.requestID));
    }*/

    handleClose();
  };

  //console.log(props.requestID)

  return (
    <div className="complaint-details">
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
        {
          complaints
            .filter((complaint) => complaint._id === props.complaintID)
            .map((filteredComplaint) => (
              <div className="each-complaint" key={filteredComplaint._id}>
                <DialogTitle
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    margin: "20px 0px",
                  }}
                >
                  {filteredComplaint.title}
                </DialogTitle>
                <DialogContent>
                  <p>
                    <strong>Description: </strong>
                    {filteredComplaint.description}
                  </p>
                  <p className="date">
                    Published{" "}
                    {formatDistanceToNow(new Date(filteredComplaint.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </DialogContent>
              </div>
            ))
        }
        <DialogActions style={{ display: "flex", justifyContent: "space-evenly", height: "100%", alignItems: "center", marginBottom: "60px" }}>
          <button className="close-popup" onClick={handleClose}>
            Close
            <CloseIcon />
          </button>
          {
            isAdminAuthenticated ? (
              <button className="delete-req" onClick={handleDelete}>
                Save
                <FavoriteIcon />
              </button>
            ) : (
              <div></div>
            )
          }

        </DialogActions>
        {props.children}

      </Dialog>
    </div>
  )

}

export default ComplaintDetails;