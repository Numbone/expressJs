// Import necessary modules and types
import express, { NextFunction, Request, Response, Router } from 'express';
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from './controllers/index.controllers';
import fs from 'fs';
// Create an Express application
const app = express();

// Create a Router instance for handling task-related routes
const taskRouter = Router();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server log 
app.use(function(req:Request,res:Response,next:NextFunction){
    const now= new Date();
    const hour=now.getHours();
    const minutes=now.getMinutes();
    const seconds=now.getSeconds();
    const data=`${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")})}`;
    fs.appendFile("server.log",data + "\n",(err)=>console.log(err));
    next()
})


// Define routes for task operations using the taskRouter
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', deleteTask);
taskRouter.delete('/tasks/:id', updateTask);

// Use the taskRouter for paths starting with '/api'
app.use(taskRouter);

// Set up the Express application to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});