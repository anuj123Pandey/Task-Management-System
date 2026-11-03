const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// CREATE TASK API
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const newTask = await Task.create({
            title: title,
            description: description,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task created successfully!",
            task: newTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// GET ALL TASKS API

    
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        });

        res.status(200).json({
            message: "Tasks fetched successfully!",
            tasks: tasks
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});



// UPDATE TASK API

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                title,
                description,
                completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully!",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});



// DELETE TASK API

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;