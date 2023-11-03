const { register, login, getAllUsers, updateAvatar, getUserById } = require("../controllers/usersController");


const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:userId", getUserById);
router.get("/all-users", getAllUsers);
router.put("/users/:userId", updateAvatar);

module.exports = router;
 

