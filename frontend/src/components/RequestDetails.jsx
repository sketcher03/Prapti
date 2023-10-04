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

const RequestDetails = (props) => {

    const { requests } = useSelector((state) => state.requests);
    //console.log(requests)

    const handleDelete = async () => {

        Store.dispatch(deleteRequest(props.requestID));
    };
  
    const handlePopup = async (e) => {
      e.preventDefault();

      props.setTrigger(false);
    };

    //console.log(props.requestID)

    return props.trigger ? (
      <div className="popup">
        <div className="request-details">
          {requests
            .filter((request) => request._id === props.requestID)
            .map((filteredRequest) => (
              <div className="request-each" key={filteredRequest._id}>
                <h4>{filteredRequest.title}</h4>
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
              </div>
            ))}
          <div className="req-button-grp">
            <button className="close-popup" onClick={handlePopup}>
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
          </div>
          {props.children}
        </div>
      </div>
    ) : (
      ""
    );
}

export default RequestDetails;