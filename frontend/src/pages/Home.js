import { useEffect, useState } from 'react';

//components
import RequestDetails from '../components/RequestDetails';
import RequestForm from '../components/RequestForm';
import '../components/PopupForm.css'

const Home = () => {

    const [requests, setRequests] = useState(null);
    const [requestPopup, setRequestPopup] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('/api/requests');
            const json = await response.json();

            if(response.ok){
                setRequests(json);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="home">
            <h1>All Requests Posted</h1>
            <div className="requests">
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