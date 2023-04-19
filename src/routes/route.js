import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserByID);
userRouter.post('/', userController.register);
userRouter.put('/:id', userController.updateUserByID);
userRouter.delete('/:id', userController.deleteUserByID);
