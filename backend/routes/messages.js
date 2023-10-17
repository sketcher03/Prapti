const express = require('express');
const { upload } = require("../multer");
const requireAuth = require('../middleware/requireAuthentication');

const router = express.Router();

const { sendMessage, allMessages } = require("../controllers/messageController");

//sending message
router.post("/", requireAuth, sendMessage);

//get all chats for a chat
router.get("/:id", requireAuth, allMessages);

module.exports = router;