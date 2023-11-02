import {useState} from 'react'
import axios from 'axios';
import { server } from '../../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const CreateComplaintForm = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const [data, setData] = useState({
        category : "",
        title  : "",
        description : "",
    })

    

    const handleChange = ({currentTarget : input}) => {
        setData ({...data, [input.name] : input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        //console.log (data);
        const newComplaint = {
            category : data.category,
            title : data.title,
            description : data.description,
            user_id : user._id,
        }
        const url = `${server}/help/complaint`
        await axios.post(url, newComplaint, {withCredentials : true})        
        .then((res) => {
            console.log(res.data.message);
            navigate("/complaint");
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
        
    }

  return (
    <form onSubmit={handleSubmit} style={{width : "800px"}} >
        <h3>File Your Complaint</h3>
        <label>Enter Your Subject</label>
        <input
        type='text'
        name='title'
        value= {data.title}
        onChange= {handleChange}       
        />

        <label>Description</label>
        <textarea
        name = 'description'
        value={data.description}
        onChange={handleChange}
        >
        </textarea>

        <label>Choose Your Category</label>
        <input
        type='text'
        name='category'
        value= {data.category}
        onChange= {handleChange}       
        />
        <button>Submit
        </button>
       
    </form>
  )
}

export default CreateComplaintForm