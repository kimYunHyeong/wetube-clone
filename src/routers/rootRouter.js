import express from "express";
import { showHomepage, getSearch } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const rootRouter = express.Router();
rootRouter.get("/", showHomepage);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/search").get(getSearch);

export default rootRouter;
