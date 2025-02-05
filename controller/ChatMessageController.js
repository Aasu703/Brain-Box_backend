const ChatMessage = require('../models/ChatMessage');

exports.sendMessage = async (req, res) => {
    try {
        const message = await ChatMessage.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};