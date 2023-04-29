import express, { Request, Response } from "express";

const router = express.Router();

function signin(request: Request, response: Response) {

  
  response
    .status(200)
    .json({ message: "getting the user sign in", body: request.body });
}

function signup(request: Request, response: Response) {}

router.post("/signin", signin);

router.post("/signup", signup);

export default router;
