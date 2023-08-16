const express = require("express");
const router = express.Router();
const { insertUser, getUser } = require("../controller/user.controller");

router.post("/", insertUser);

router.get("/:id", getUser);

module.exports = router;
