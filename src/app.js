import express from "express";
import cors from "cors";
import roomRoutes from "./routes/room.routes.js";

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ROUTES
app.use("/api/rooms", roomRoutes);

//HEALTH CHECK
app.get("/", (req, res) => {
  res.send("DevVault API running");
});

export default app;
