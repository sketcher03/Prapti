import Store from "../redux/store";
import { deleteRequest } from "../redux/actions/requests";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RequestDetails = ({ request }) => {

    const handleClick = async () => {

        Store.dispatch(deleteRequest(request._id));
    }

    return (
        <div className="request-details">
            <h4>{request.title}</h4>
            <p><strong>Description: </strong>{request.description}</p>
            <p><strong>Service: </strong>{request.category}</p>
            <p><strong>Budget: </strong>{request.budget}</p>
            <p><strong>Time (days): </strong>{request.timeline}</p>
            <p className='date'>Published {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default RequestDetails;