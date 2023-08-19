const express = require("express");
const router = express.Router();
const {
    insertUser,
    getUser,
    signup,
    login,
} = require("../controller/user.controller");

router.post("/", insertUser);

router.post("/signup", signup);

router.get("/login/", login);

router.get("/:id", getUser);

module.exports = router;
