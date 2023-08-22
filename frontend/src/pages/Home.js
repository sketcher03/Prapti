import { useEffect, useState } from 'react';

//components
import RequestDetails from '../components/RequestDetails';
import RequestForm from '../components/RequestForm';

const Home = () => {

    const [requests, setRequests] = useState(null)

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
            <div className="requests">
                {requests && requests.map((request) => (
                    <RequestDetails key="request._id" request={request}/>
                ))}
            </div>
            <RequestForm />
        </div>
    )
}

export default Home;