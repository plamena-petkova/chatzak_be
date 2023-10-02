const messageModel = require("../models/messageModel");


module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            message: { text: message},
            users: [from, to],
            sender: from
        });
        if( data ) {
            return res.json({msg:"Message adedd successfully"})
        } else {
            return res.json({msg:"Failed to add message to Database"})
        }
    } catch (err) {
        next(err);
        console.error(err);
    }
};
module.exports.getAllMessages = async (req, res, next) => {};

