const Project = require('../models/projectModel');
const mongoose = require('mongoose');

const path = require("path");

//Create a new request
const createProject = async (req, res) => {

    const { user_id, title, category, description, deliverables, priceTiers, requirements } = req.body;

    console.log(req.body, req.files);
    //add document to DB
    try {
        const pictures = req.files;
        const pictureURL = [];

        if (Array.isArray(pictures) && pictures.length > 0) {
            //console.log(pictures);
            for (let i = 0; i < pictures.length; i++){
                const filename = path.join(pictures[i].filename);
                pictureURL.push(filename);
            }
        }
        else {
            console.log(pictures);
            throw Error("File upload unsuccessful");
        }

        const jsonCategory = JSON.parse(category);
        const jsonDeliverables = JSON.parse(deliverables);
        const jsonPriceTiers = JSON.parse(priceTiers);
        const jsonRequirements = JSON.parse(requirements);

        const project = {
            title: title,
            category: jsonCategory,
            pictures: pictureURL,
            priceTiers: jsonPriceTiers,
            requirements: jsonRequirements,
            description: description,
            deliverables: jsonDeliverables,
            user_id: user_id,
        }

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(404).send({ message: 'Invalid User' });
        }
        
        console.log(project);

        const newProject = await Project.create(project);
        console.log("New Project Created Successfully")

        res.status(200).send({ project: newProject, success: true, message: "Your Project has been Submitted for Review Successfully!" });
    } 
    catch (error){
        res.status(400).send({ message: error.message });
    }
};

module.exports = {
    createProject
};