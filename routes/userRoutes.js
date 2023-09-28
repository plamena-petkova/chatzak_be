const { register, login, getAllUsers } = require("../controllers/usersController");


const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);

module.exports = router;
 

