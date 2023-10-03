// import { useRequestContext } from '../hooks/useRequestsContext'
// import { useAuthContext } from "../hooks/useAuthContext";
import { useSelector } from "react-redux";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RequestDetails = ({ request }) => {
    // const { dispatch } = useRequestContext();

    const { isAuthenticated } = useSelector((state) => state.user);

    const handleClick = async () => {
        if(!isAuthenticated) {
            return
        }

        // const response = await fetch('/api/requests/' + request._id, {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })

        // const json = await response.json();

        // if(response.ok){
        //     dispatch({type: 'DELETE_REQUEST', payload: json});
        // }
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