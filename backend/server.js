// Create backend server
const express = require("express");
// Allow frontend to communicate with backend
const cors = require("cors");

//app control whole server
const app = express();
const PORT = 3000;

//allow frontend to access API
app.use(cors());
//allow express to read json data 
app.use(express.json());

const taskRoutes = require("./routes");
app.use("/tasks", taskRoutes);

//test server working by creating GET API /
app.get("/",(req, res)=>{
    res.send("Taskflow server is running");
});

//starts server once after testing
app.listen(PORT, ()=> {
    console.log("Server started on port " + PORT);
})