const Complaint = require ('../models/complaintModel');

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

//get complaint from a single user

const getComplaints = async (req, res) => {
     const user_id = req.user._id;
    console.log

    try {
        const complaints = await Complaint.find({user_id}).sort({createdAt: -1});
        res.status(200).send({complaints, message: "All Your Complaints are found."});
    }
    catch(error){
        res.status(500).send({ message : error.message});
    }
}


module.exports={
createComplaint,
getComplaints,
}