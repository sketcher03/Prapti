import { useEffect } from 'react'
import '../../css/Help.css';
import { Link } from 'react-router-dom';
import Store from '../../redux/store';
import { setComplaints } from '../../redux/actions/help';
import { useSelector } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ComplaintDetails from '../../components/Help/ComplaintDetails';
import { useState } from 'react';

const Complaint = () => {

  const { complaints } = useSelector((state) => state.help);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(setComplaints(complaints._id));

  }, []);
  console.log(complaints);



  return (
    <div className='help-container'>
      <Link to="/complaint/create">
        <button style={{ marginBottom: "30px" }}>File Your Complaints</button>
      </Link>

      <div className='complaint-container'>
        <div className="complaints">
          <h1>All Complaints You Posted</h1>
          {complaints && complaints.map((complaint) => (
            <div className="complaint-details" key={complaint._id}>
              <Link onClick={() => { setOpen(true), setRequestId(complaint._id) }}>
              <h4>{complaint.title}</h4>
              </Link>
              <p><strong>Category: </strong>{complaint.category}</p>
              <p className='date'>
                Published {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
              </p>
            </div>
          ))}
          <ComplaintDetails
            complaintID={complaints}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default Complaint;