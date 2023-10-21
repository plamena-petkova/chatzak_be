const { addMessage, getAllMessages, deleteMessage } = require("../controllers/messagesController");


const router = require("express").Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessages);
router.patch("/message/:messageId", deleteMessage)


module.exports = router;
 

