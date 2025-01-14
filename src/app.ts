import express from "express";
import cors from "cors";

const app = express;
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

// application route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("This is Room Booking Server!");
});


export default app;