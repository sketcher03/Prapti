const express = require('express');

const requireAuth = require('../middleware/requireAuthentication');

const router = express.Router();

const { accessChat, fetchChats } = require("../controllers/chatController");

//accessing or creating the chat
router.post("/", accessChat);

//get all chats for the logged in user
router.get("/", requireAuth, fetchChats);

module.exports = router;