import express from "express";
import { getAllUser, getUserByID, signin, signup } from "../controllers/user";
import { checkAdmin, requireSignin } from "../common/user";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.get("/user", requireSignin, checkAdmin, getAllUser);

router.get("/user:_id", requireSignin, getUserByID);

export default router;
