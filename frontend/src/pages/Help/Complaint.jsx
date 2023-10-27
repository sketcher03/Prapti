import { useEffect } from 'react'
import '../../css/Help.css';
import { Link } from 'react-router-dom';
import Store from '../../redux/store';
import { setComplaints } from '../../redux/actions/help';
import { useSelector } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Complaint = () => {

  const { complaints } = useSelector((state) => state.help);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(setComplaints(user._id));

  }, []);
  console.log(complaints);



  return (
    <div className='help-container'>
      <Link to="/complaint/create">
        <button style={{ marginBottom: "30px" }}>File Your Complaints</button>
      </Link>

      <div className='complaint-container'>
        <div className="complaints">
          <h1>All Complaints Posted</h1>
          {complaints && complaints.map((complaint) => (
            <div className="complaint-details" key={complaint._id}>
              <h4>{complaint.title}</h4>
              <p><strong>Category: </strong>{complaint.category}</p>
              <p className='date'>
                Published {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Complaint;