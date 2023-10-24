import {useEffect} from 'react'
import '../../css/Help.css';
import {Link} from 'react-router-dom';
import Store from '../../redux/store';
import { setComplaints } from '../../redux/actions/help';
import { useSelector } from 'react-redux';

const Complaint = () => {

  //const {complaints} = useSelector((state) => state.complaints);
  useEffect(() => {
    Store.dispatch(setComplaints());
  
  },[]);
  //console.log(complaints);

  

  return (
    <div className='help-container'>
      <Link to ="/complaint/create">
        <button style={{marginBottom : "30px"}}>File Your Complaints</button>
      </Link>

      <div className='complain-container'>
      </div>
    </div>
  )
}

export default Complaint