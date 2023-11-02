import {useState} from 'react'
import axios from 'axios';
import { server } from '../../../server';
import { useSelector } from 'react-redux';

const CreateFeedbackForm = () => {

    const { user } = useSelector((state) => state.user);

    const [data, setData] = useState({
        subject : "",
        feedback  : "",
    })

    

    const handleChange = ({currentTarget : input}) => {
        setData ({...data, [input.name] : input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        //console.log (data);
        const newFeedback = {
            subject : data.subject,
            feedback : data.feedback,
            user_id : user._id,
        }
        const url = `${server}/help/feedback`
        await axios.post(url, newFeedback, {withCredentials : true})        
        .then((res) => {
            console.log(res.data.message);
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
        
    }

  return (
    <form onSubmit={handleSubmit} style={{width : "800px"}} >
        <h3>Give Your Feedback</h3>
        <label>Enter Your Subject</label>
        <input
        type='text'
        name='subject'
        value= {data.subject}
        onChange= {handleChange}       
        />

        <label>feedback</label>
        <textarea
        name = 'feedback'
        value={data.feedback}
        onChange={handleChange}
        >
        </textarea>
    </form>
  )
}

export default CreateFeedbackForm;