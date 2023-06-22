const express = require("express");
const userRouter = express.Router();
const { authenticateJWT } = require("../middlewares/auth");

const { updateUser } = require("../controllers/user/putUser");
const {loginUser} = require("../controllers/user/loginUser");
const { createUser } = require("../controllers/user/postUser");

userRouter.post("/", createUser);
userRouter.put("/:id", authenticateJWT, updateUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
