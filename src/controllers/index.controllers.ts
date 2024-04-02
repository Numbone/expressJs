// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import { pool } from '../db/db';


// Controller for a new task
export const createTask = async (req: Request, res: Response): Promise<Response> => {
    // Extract task details from the request body
    //(title, description, completed)
    const { title, description, completed } = req.body;
    // Execute a SQL INSERT statement
    await pool.query('INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)', [title, description, completed]);
    // Send a JSON response to the client
    return res.status(201).json({
      // Task Created successfully
      message: 'Task created successfully12313',
      task: {
        title,
        description,
        completed,
      }
    });
  };


  // Get all tasks
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Execute a PostgreSQL query to select all tasks
      const response: QueryResult = await pool.query('SELECT * FROM tasks');
  
      // Return a JSON response with the retrieved tasks
      return res.status(200).json(response.rows);
    } catch (error) {
      // Handle errors, log them, and return an internal server error response
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }
  
  // Get a task by ID
  export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
    // Extract the task ID from the request parameters
    const id = parseInt(req.params.id);
  
    try {
      // Execute a PostgreSQL query to select a task by ID
      const response: QueryResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  
      // Return a JSON response with the retrieved task
      return res.json(response.rows);
    } catch (error) {
      // Handle errors, log them, and return an internal server error response
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }

  // Update a task by ID
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    // Extract task ID from request parameters
    const id = parseInt(req.params.id);
  
    // Extract updated task details from request body
    const { title, description, completed } = req.body;
  
    try {
      // Execute a PostgreSQL query to update the task by ID
      await pool.query('UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4', [title, description, completed, id]);
  
      // Return a JSON response with the updated task details
      return res.json({
        message: 'Task updated successfully',
        task: {
          id,
          title,
          description,
          completed,
        },
      });
    } catch (error) {
   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }
  
  // Delete a task by ID
  export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    // Extract task ID from request parameters
    const id = parseInt(req.params.id);
  
    try {
      // Execute a PostgreSQL query to delete the task by ID
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  
      // Return a JSON response indicating successful deletion
      return res.status(200).json(`Task ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }