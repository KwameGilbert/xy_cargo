import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ message: "Get all users" }));
userRouter.get("/:id", (req, res) => res.send({ message: `Get user with ID ${req.params.id}` }));
userRouter.post("/", (req, res) => res.send({ message: "Create a new user" }));
userRouter.put("/:id", (req, res) => res.send({ message: `Update user with ID ${req.params.id}` }));
userRouter.delete("/:id", (req, res) => res.send({ message: `Delete user with ID ${req.params.id}` }));

export default userRouter;

