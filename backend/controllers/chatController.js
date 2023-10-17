const User = require('../models/userModel');
const Chat = require('../models/chatModel');

//Create a new chat or access a chat
const accessChat = async (req, res) => {

    const { userDataID, userID } = req.body;

    if (!userDataID && !userID) {
        console.log("User IDs not sent in request");
        res.status(400).send({ message: "User IDs not sent in request" });
    }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: userID } } },
            { users: { $elemMatch: { $eq: userDataID } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "display_name profilePic email"
    })

    if (isChat.length > 0) {

        const fullChat = isChat[0];

        console.log(fullChat);

        res.status(200).send({ chat: fullChat, message: "Chat Found Successfully" });
    }
    else {
        const chatData = {
            users: [userID, userDataID]
        }

        try {
            const createdChat = await Chat.create(chatData);
            
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            console.log(fullChat);

            res.status(200).send({ chat: fullChat, message: "Chat Created Successfully" });
        }
        catch (error) {
            console.log(error.message);
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
                    select: "display_name profilePic email",
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