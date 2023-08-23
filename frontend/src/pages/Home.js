import { useEffect, useState } from 'react';
import { useRequestContext } from '../hooks/useRequestsContext'

//components
import RequestDetails from '../components/RequestDetails';
import RequestForm from '../components/RequestForm';
import '../components/PopupForm.css'

const Home = () => {
    const { requests, dispatch } = useRequestContext();

    //const [requests, setRequests] = useState(null);
    const [requestPopup, setRequestPopup] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/api/requests');
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_REQUESTS', payload: json});
                //setRequests(json);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="home">
            <div className="requests">
                <h1>All Requests Posted</h1>
                {requests && requests.map((request) => (
                    <RequestDetails key="request._id" request={request}/>
                ))}
            </div>

            <button className='requestbtn' onClick={() => setRequestPopup(true)}>Make a Request</button>
            <RequestForm trigger={requestPopup} setTrigger={setRequestPopup}/>
        </div>
    )
}

export default Home;