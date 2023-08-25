import { useRequestContext } from '../hooks/useRequestsContext'

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RequestDetails = ({ request }) => {
    const { dispatch } = useRequestContext();

    const handleClick = async () => {
        const response = await fetch('/api/requests/' + request._id, {
            method: 'DELETE'
        })

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_REQUEST', payload: json});
        }
    }

    return (
        <div className="request-details">
            <h4>{request.title}</h4>
            <p><strong>Description: </strong>{request.description}</p>
            <p><strong>Service: </strong>{request.category}</p>
            <p><strong>Budget: </strong>{request.budget}</p>
            <p><strong>Time (days): </strong>{request.timeline}</p>
            <p className='date'>Published {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</p>
            <span class="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default RequestDetails;