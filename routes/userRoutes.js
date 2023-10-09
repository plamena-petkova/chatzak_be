const { register, login, getAllUsers, updateAvatar } = require("../controllers/usersController");


const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.put("/users/:userId", updateAvatar);

module.exports = router;
 

