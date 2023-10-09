const Project = require('../models/projectModel');
const mongoose = require('mongoose');

//Create a new request
const createProject = async (req, res) => {
    const { title, category, priceTiers, requirements, description, deliverables } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title');
    }
    if(!description) {
        emptyFields.push('description');
    }
    if(!category) {
        emptyFields.push('category');
    }
    if(!priceTiers) {
        emptyFields.push('priceTiers');
    }
    if(!requirements) {
        emptyFields.push('requirements');
    }
    if (!deliverables) {
        emptyFields.push('deliverables');
    }
    if(emptyFields.length > 0) {
        return res.status(400).send({ message: 'Please fill in all the fields', emptyFields });
    }

    //add document to DB
    try{
        const user_id = req.user._id;

        const project = {
            title: title,
            category: category,
            pictures: pictures,
            priceTiers: priceTiers,
            requirements: requirements,
            description: description,
            deliverables: deliverables,
            user_id: user_id,
        }

        const newProject = await Project.create(project);
        res.status(200).send({ project: newProject });
    } 
    catch (error){
        res.status(400).send({ message: error.message});
    }
};

module.exports = {
    createProject
};