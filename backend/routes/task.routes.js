const express = require("express");
const router = express.Router();
const {
    deleteTask,
    getTask,
    createTask,
    updateTask,
} = require("../controller/task.controller");

router.post("/", createTask);

router.get("/:id", getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
