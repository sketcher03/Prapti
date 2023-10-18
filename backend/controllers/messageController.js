const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

//Create a new chat or access a chat
const sendMessage = async (req, res) => {

    const { text, chatID, senderID, recieverID } = req.body;

    console.log(text, chatID)

    try {
        if (!text || !chatID) {
            throw Error("Invalid Data in Request")
        }

        const newMessage = {
            sender: senderID,
            reciever: recieverID,
            text: text,
            chat: chatID,
        };

        var message = await Message.create(newMessage);

        message = await message.populate("sender", "display_name profilePic");
        message = await message.populate("reciever", "display_name profilePic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "display_name profilePic email",
        });

        await Chat.findByIdAndUpdate(chatID, { latestMessage: message });

        res.status(200).send({ text: message, message: "Message Stored Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
    
}

//Create a new chat or access a chat
const allMessages = async (req, res) => {

    const { id } = req.params;

    console.log(id)

    try {
        const messages = await Message.find({ chat: id })
            .populate("sender", "display_name profilePic email")
            .populate("reciever", "display_name profilePic email")
            .populate("chat");
        
        //console.log(messages)
        
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