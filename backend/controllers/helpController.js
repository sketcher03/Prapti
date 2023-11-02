const Complaint = require ('../models/complaintModel');
const Feedback = require ('../models/feedbackModel');


//create new complaint
const createComplaint = async(req, res) => {
     
    const { category, title, description, user_id } = req.body;

    try{
        const newComplaint = {
            category : category,
            title : title,
            description : description,
            user_id : user_id,
        }

        const complaint = await Complaint.create(newComplaint);
        res.status(200).send({ message : "Complaint submitted successfully.", complaint});
    }
    catch(error){
        res.status(400).send({ message : error.message});
    }
}

//create new feedback
const createFeedback = async(req, res) => {
     
    const { subject, feedback,user_id } = req.body;

    try{
        const newFeedback = {
            subject: subject,
            feedback: feedback,
            user_id : user_id,
        }

        const feedback = await Feedback.create(newFeedback);
        res.status(200).send({ message : "Feedback submitted successfully.", feedback});
    }
    catch(error){
        res.status(400).send({ message : error.message});
    }
}

//get complaint from a single user
const getComplaints = async (req, res) => {


    const { id } = req.params;
    //console.log

    try {
        const complaints = await Complaint.find({user_id: id}).sort({createdAt: -1});
        res.status(200).send({complaints, message: "All Your Complaints are found."});
    }
    catch(error){
        res.status(500).send({ message : error.message});
    }
}


module.exports={
createComplaint,
createFeedback,
getComplaints,
}