import { useState } from 'react';
//import { useRequestContext } from '../hooks/useRequestsContext'
import "../css/PopupForm.css"
//import { useAuthContext } from "../hooks/useAuthContext";
import { useSelector } from "react-redux";

const RequestForm = (props) => {
    //const { dispatch } = useRequestContext();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [timeline, setTimeline] = useState('');

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    //const { user } = useAuthContext();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { requests } = useSelector((state) => state.requests);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isAuthenticated) {
            setError('You must be logged in');
            return
        }
        
        const request = {title, description, category, budget, timeline};

        const response = await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if(response.ok){

            setTitle('');
            setDescription('');
            setCategory('');
            setBudget('');
            setTimeline('');
            setEmptyFields([]);
            
            props.setTrigger(false);

            setError(null);
            console.log('New Request Added', json);

            dispatch({type: 'CREATE_REQUEST', payload: json});
        }
    };

    return (props.trigger) ? (
        <div className='popup'>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Post a New Request</h3>

                <label>Give your request a title</label>
                <input 
                    type="text" 
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>What are you looking to get done?<br/>Give us a great description.</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={emptyFields.includes('description') ? 'error' : ''}
                ></textarea>

                <label>Which category best fits your project?</label>
                <input 
                    type="text" 
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className={emptyFields.includes('category') ? 'error' : ''}
                />

                <label>I'm willing to spend up to...</label>
                <input 
                    type="Number" 
                    required
                    onChange={(e) => setBudget(e.target.value)}
                    value={budget}
                    className={emptyFields.includes('budget') ? 'error' : ''}
                />

                <label>Expected Timeline (days) </label>
                <input 
                    type="Number"
                    required
                    onChange={(e) => setTimeline(e.target.value)}
                    value={timeline}
                    className={emptyFields.includes('timeline') ? 'error' : ''}
                />

                <button>Submit for Review</button>
                {error && <div className="error">{ error }</div>}
            </form>
            { props.children }
        </div>
    ) : "";
};

export default RequestForm;