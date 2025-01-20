import express from "express";
import router from "./app/routes";
// import notFound from "./app/middleWare/notFound";
import globalErrorhandler from "./app/middleWare/globalErrorhandler";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://meeting-room-client-beta.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Meeting Room Server is Running!");
});

app.use(globalErrorhandler);

// app.use(notFound);

export default app;
