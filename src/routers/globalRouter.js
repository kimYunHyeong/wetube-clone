import express from "express";
import { showHomepage } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", showHomepage);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
