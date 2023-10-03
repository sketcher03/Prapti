import { useEffect, useState } from 'react';
//import { useRequestContext } from '../hooks/useRequestsContext'
//import { useAuthContext } from "../hooks/useAuthContext";
import '../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../redux/store";
import { setRequests } from '../redux/actions/requests';

//components
import RequestDetails from '../components/RequestDetails';
import RequestForm from '../components/RequestForm';


const Requests = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { requests } = useSelector((state) => state.requests)
    //const { requests, dispatch } = useRequestContext();

    //const [requests, setRequests] = useState(null);
    const [requestPopup, setRequestPopup] = useState(false);

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setRequests());
        
    }, [requests, user]);

    return (
        <div className="req-container">
            <div className="requests">
                <h1>Your Requests</h1>
                {requests && requests.map((request) => (
                    <RequestDetails key={request._id} request={request}/>
                ))}
            </div>

            {/* <button className='requestbtn' onClick={() => setRequestPopup(true)}>Make a Request</button> */}
            {/* <RequestForm trigger={requestPopup} setTrigger={setRequestPopup}/> */}
        </div>
    )
}

export default Requests;