import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Meeting Room Server is Running!");
});



export default app;
