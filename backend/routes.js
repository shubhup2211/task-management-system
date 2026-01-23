const express = require("express");
const db = require("./db");

const router = express.Router();


//GET all tasks

router.get("/", (req,res) => {
    const query = "SELECT * FROM tasks ORDER BY created_at DESC" ;

    db.query(query, (err, results)=> {
        if (err){
            console.log("Error fetching tasks ", err);
            res.status(500).json({message : "Failed to fetch tasks"});
        } else {
            res.json(results);
        }
    });
});

// Get a single task by ID - needed for edit task
router.get("/:id", (req, res) => {
    const taskId = req.params.id;
    const query = "SELECT * FROM tasks WHERE id = ?";

    db.query(query, [taskId], (err, results) => {
        if (err) {
            console.log("Error fetching task ", err);
            res.status(500).json({message : "Failed to fetch task"});
        } else {
            if (results.length === 0) {
                res.status(404).json({message : "Task not found"});
            } else {
                res.json(results[0]);
            }
        }
    });
});

// Add new Task

router.post("/", (req,res) => {

    //read data sends from frontend
    const {title, description, status } = req.body;

    // basic field validation
    if(!title || !status){
        res.status(500).json({ message : "Title and Status are required!"});
    }

    const query = "INSERT INTO tasks (title, description, status) VALUES (?,?,?)";

    db.query(query, [title, description, status], (err, results)=>{
        if(err){
            console.log("Task not added check fields again: ", err);
            res.status(500).json({message : "Failed to add task"});
        } else {
            res.json({message: "Task added successfully"});
        }
    });
});


// Update a task
router.put("/:id", (req,res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if(!title || !status){
        res.status(400).json({message: "Title and Status are required!"});
    }

    const query = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";

    db.query(query, [title, description, status, taskId], (err, results) => {
        if(err){
            console.log("Error updating task: ", err);
            res.status(500).json({message: "Failed to update task"});
        } else {
            res.json({message: "Task updated successfully"});
        }
    });
});


//Delete a task
router.delete("/:id", (req,res) => {
    const taskId = req.params.id;

    const query = "DELETE FROM tasks WHERE id = ?";

    db.query(query, [taskId], (err,results) => {
        if(err){
            console.log("Error deleting task: ", err);
            res.status(500).json({message : "Failed to deleting task"});
        } else {
            res.json({message : "Task delete successfully"});
        }
    });
});

module.exports = router;