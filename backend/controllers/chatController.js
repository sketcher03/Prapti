const User = require('../models/userModel');
const Chat = require('../models/messageModel');
const mongoose = require('mongoose');

//Create a new chat or access a chat
const accessChat = async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        console.log("User ID not sent in request");
        res.status(400).send({ message: "User ID not sent in request" });
    }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userID } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name profilePic email"
    })

    if (isChat.length > 0) {

        const fullChat = isChat[0];

        res.status(200).send({ fullChat });
    }
    else {
        const chatData = {
            users: [req.user._id, userID]
        }

        try {
            const createdChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send({ fullChat });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    
}

//Create a new request
const fetchChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name profilePic email",
                });
                res.status(200).send({ chats: results, message: "All Chats extracted" });
            });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    accessChat,
    fetchChats
};