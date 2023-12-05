const { addMessage, getAllMessages, deleteMessage, editMessage } = require("../controllers/messagesController");


const router = require("express").Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessages);
router.patch("/message/:messageId", deleteMessage);
router.put("/message/:messageId", editMessage);


module.exports = router;
 

