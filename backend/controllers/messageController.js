const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

//Create a new chat or access a chat
const sendMessage = async (req, res) => {

    const { text, chatID, senderID } = req.body;

    if (!text || !chatID) {
        console.log("Invalid Data sent in request");
        res.status(400).send({ message: "Invalid Data sent in request" });
    }

    const newMessage = {
        sender: senderID,
        content: text,
        chat: chatID,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "display_name profilePic").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await User.populate(message, {
            path: "chat.users",
            select: "display_name profilePic email",
        });

        await Chat.findByIdAndUpdate(chatID, { latestMessage: message });

        res.status(200).send({ text: message });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
    
}

//Create a new chat or access a chat
const allMessages = async (req, res) => {

    const { id } = req.params;

    try {
        const messages = await Message.find({ chat: id })
            .populate("sender", "display_name profilePic email")
            .populate("chat");
        
        res.status(200).send({ messages: messages, message: 'All Messages Sent' });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    sendMessage,
    allMessages
};