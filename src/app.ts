import express from "express";
import { Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middleWare/notFound";
import globalErrorhandler from "./app/middleWare/globalErrorhandler";

const app = express();

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Meeting Room Server is Running!");
});

app.use(notFound);

app.use(globalErrorhandler);

export default app;
