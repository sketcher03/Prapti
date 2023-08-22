import { useState } from 'react';

const RequestForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [timeline, setTimeline] = useState('');

    const [error, setError] = useState(null);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const request = {title, description, category, budget, timeline};

        const response = await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }

        if(response.ok){
            setTitle('');
            setDescription('');
            setCategory('');
            setBudget('');
            setTimeline('');
            
            props.setTrigger(false);

            setError(null);
            console.log('New Request Added', json);
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
                />

                <label>What are you looking to get done?<br/>Give us a great description.</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <label>Which category best fits your project?</label>
                <input 
                    type="text" 
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />

                <label>I'm willing to spend up to...</label>
                <input 
                    type="Number" 
                    required
                    onChange={(e) => setBudget(e.target.value)}
                    value={budget}
                />

                <label>Expected Timeline (days) </label>
                <input 
                    type="Number"
                    required
                    onChange={(e) => setTimeline(e.target.value)}
                    value={timeline}
                />

                <button>Submit for Review</button>
                {error && <div className="error">{ error }</div>}
            </form>
            { props.children }
        </div>
    ) : "";
};

export default RequestForm;