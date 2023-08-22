const RequestDetails = ({ request }) => {

    return (
        <div className="request-details">
            <h4>{request.title}</h4>
            <p><strong>Description: </strong>{request.description}</p>
            <p><strong>Service: </strong>{request.category}</p>
            <p><strong>Budget: </strong>{request.budget}</p>
            <p><strong>Time (days): </strong>{request.timeline}</p>
            <p><strong>Date Created: </strong>{request.createdAt}</p>
        </div>
    )
}

export default RequestDetails;