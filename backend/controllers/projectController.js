const Project = require('../models/projectModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const path = require("path");

//Create a new request
const createProject = async (req, res) => {

    const { user_id, role, title, category, description, deliverables, priceTiers, requirements } = req.body;

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
            user_id: user_id
        }

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(404).send({ message: 'Invalid User' });
        }
        
        console.log(project);

        const newProject = await Project.create(project);
        //console.log("New Project Created Successfully")

        const user = await User.findByIdAndUpdate(user_id, { role: "seller" }, {
            new: true
        })

        res.status(200).send({ project: newProject, user, success: true, message: "Your Project has been Submitted for Review Successfully!" });
    } 
    catch (error){
        res.status(400).send({ message: error.message });
    }
};

//GET all requests
const getProjects = async (req, res) => {

    const user_id = req.user._id;

    try {
        const projects = await Project.find({ user_id }).sort({ createdAt: -1 });

        res.status(200).send({ projects, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

};

//GET all requests
const getAllProjects = async (req, res) => {

    try {
        const projects = await Project.find();

        res.status(200).send({ projects, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

};

//GET a single project
const getProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'No Such Project' });
    }

    const project = await Project.findById(id);

    if (!project) {
        return res.status(404).send({ message: 'No Such Project' });
    }

    res.status(200).send({ project });
};

//Delete a project
const deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'No Such Project' });
    }

    const project = await Project.findOneAndDelete({ _id: id });

    if (!project) {
        return res.status(400).send({ message: 'Project could not be deleted' });
    }

    res.status(200).send({ project });
}

module.exports = {
    createProject,
    getProjects,
    getAllProjects,
    getProject,
    deleteProject
};