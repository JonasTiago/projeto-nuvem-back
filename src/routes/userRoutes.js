import { Router } from "express";
import {
  createUser,
  deleteUser,
  // findUser,
  // listUser,
  signIn,
  // updateUser,
} from "../controllers/userController.js";
import createUserValidate from "../middlewares/userSchemaMiddleware.js";

const userRoutes = new Router();

userRoutes.post("/", createUserValidate, createUser);

userRoutes.get("/", listUser);

userRoutes.delete("/:id", deleteUser);

// userRoutes.get("/:user_id", findUser);

// userRoutes.put("/:user_id", updateUser);

userRoutes.post("/sign-in", signIn);

export default userRoutes;