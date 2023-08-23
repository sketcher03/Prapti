const RequestDetails = ({ request }) => {

    const handleClick = async () => {
        const response = await fetch('/api/requests/' + request._id, {
            method: 'DELETE'
        })

        const json = await response.json
    }

    return (
        <div className="request-details">
            <h4>{request.title}</h4>
            <p><strong>Description: </strong>{request.description}</p>
            <p><strong>Service: </strong>{request.category}</p>
            <p><strong>Budget: </strong>{request.budget}</p>
            <p><strong>Time (days): </strong>{request.timeline}</p>
            <p><strong>Date Created: </strong>{request.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default RequestDetails;