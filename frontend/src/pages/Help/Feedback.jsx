import React from 'react'
import '../../css/Help.css';
import CreateFeedbackForm from '../../components/Help/CreateFeedbackForm';

const Feedback = () => {
  return (
    <div className='help-container'>
      <CreateFeedbackForm/>
    </div>
  )
}

export default Feedback;