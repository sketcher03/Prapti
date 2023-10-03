import { useEffect, useState } from 'react';
import '../css/requests.css';
import { useSelector } from 'react-redux';
import Store from "../redux/store";
import { FiArrowRight } from "react-icons/fi";
import { setRequests } from '../redux/actions/requests';

//components
import RequestDetails from '../components/RequestDetails';
import RequestForm from '../components/RequestForm';


const Requests = () => {
    //const { isAuthenticated, user } = useSelector((state) => state.user);
    const { requests } = useSelector((state) => state.requests)
    const [requestPopup, setRequestPopup] = useState(false);

    useEffect(() => {
        // console.log(requests);
        // console.log(user)
        Store.dispatch(setRequests());
        
    }, [requests]);

    return (
        <div className="req-container">
            <p className='req-subheading'>Can't find a Specific Service?</p>
            <h2 className='req-heading'>Well... Look no further!</h2>
        <button className="requestbtn" onClick={() => setRequestPopup(true)}>
          Post a New Request <FiArrowRight />
        </button>
        <div className="requests">
          <h1>Your Requests</h1>
          <div className="requests-section">
            {requests &&
              requests.map((request) => (
                <RequestDetails key={request._id} request={request} />
              ))}
          </div>
        </div>
        <RequestForm trigger={requestPopup} setTrigger={setRequestPopup} />
      </div>
    );
}

export default Requests;