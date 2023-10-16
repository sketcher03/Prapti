import Store from "../redux/store";
import { deleteRequest } from "../redux/actions/requests";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../css/PopupForm.css";

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
  const { isSeller } = useSelector((state) => state.user);
  //console.log(requests)

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDelete = async () => {

    Store.dispatch(deleteRequest(props.requestID));
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
        {isSeller ? (
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
              </div>
            ))
        )}
        <DialogActions style={{ display: "flex", justifyContent: "space-evenly", height: "100%", alignItems: "center", marginBottom: "60px" }}>
          <button className="close-popup" onClick={handleClose}>
            Close
            <CloseIcon />
          </button>
          <Link
            to={isSeller ? "/" : `/requests/update/${props.requestID}`}
            className="edit-req"
          >
            {isSeller ? "Apply" : "Edit"}
            {isSeller ? <ForwardIcon /> : <EditIcon />}
          </Link>
          {
            !isSeller ? (
              <button className="delete-req" onClick={handleDelete}>
                Delete
                <DeleteForeverIcon />
              </button>
            ) : (
              <button className="delete-req" onClick={handleDelete}>
                Save
                <FavoriteIcon />
              </button>
            )
          }
          
        </DialogActions>
        {props.children}

      </Dialog>
    </div>
  )

}

export default RequestDetails;