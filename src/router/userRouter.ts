import { Router } from "express";
import userController from "../controllers/user.controller";

const UserController=new userController()
const userRouter =Router();
userRouter.post('/registration',UserController.registration);

export {userRouter}