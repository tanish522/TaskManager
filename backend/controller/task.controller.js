const Task = require("../models/Task");

const getTask = async (req, res) => {
    try {
        // const userId = req.params.id;
        const result = await Task.find({});
        if (result.length === 0) {
            return res.status(404).send("Tasks not found");
        }
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};

const createTask = async (req, res) => {
    try {
        // Check if the request body is empty
        if (isObjectEmpty(req.body)) {
            return res.status(400).send("Invalid input!"); // Return an error response
        }

        const newTask = Task(req.body);
        const result = await newTask.save();
        res.send(result); // Send the successful response
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!"); // Send the error response
    }
};

const updateTask = async (req, res) => {
    try {
        if (isObjectEmpty(req.body)) {
            return res.status(500).send("Invalid input");
        }
        const filter = req.params.id;
        const newTask = req.body;

        const result = await Task.findByIdAndUpdate({ _id: filter }, newTask, {
            new: true,
        });

        if (!result) {
            return res.status(404).send("Task not found");
        }
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
};

const deleteTask = async (req, res) => {
    try {
        if (isObjectEmpty(req.body)) {
            return res.status(400).send("Invalid input");
        }
        const filter = req.params.id;
        const result = await Task.findByIdAndDelete(filter);

        if (result === null) {
            return res.status(404).send("Task not found");
        }

        res.send("Deleted", result);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Internal Server Error");
    }
};

const isObjectEmpty = (jsonObject) => {
    if (Object.keys(jsonObject).length === 0) return true;

    const firstKey = Object.keys(jsonObject)[0];
    const firstValue = jsonObject[firstKey];
    if (
        !firstValue ||
        (typeof firstValue === "string" && firstValue.trim() === "")
    ) {
        return true; // First key's value is empty
    }
    return false;
};

module.exports = {
    createTask,
    updateTask,
    getTask,
    deleteTask,
};
