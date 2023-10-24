import React from 'react'
import '../../css/Help.css';
import {Link} from 'react-router-dom';

const HelpPage = () => {
  return (
    <div className='help-container'>
        <Link to ="/complaint">
        <button style={{marginBottom : "30px"}}>Your Complaints</button>
        </Link>
        <Link to ="/feedback">
        <button style={{marginBottom : "30px"}}>Feedback</button>
        </Link>
        <Link to ="/faq">
        <button style={{marginBottom : "30px"}}> FAQs</button>
        </Link>
        <Link to ="/guide">
        <button style={{marginBottom : "30px"}}>Guide</button>
        </Link>        
    </div>
  )
}

export default HelpPage