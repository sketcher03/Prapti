const express = require('express');
const requireAuth = require('../middleware/requireAuthentication');

const router = express.Router();

//const { sendMessage, allMessages } = require("../controllers/messageController");

//create order
router.post("/", requireAuth, createOrder);

//get all chats for a chat
router.get("/:id", requireAuth, allMessages);

module.exports = router;