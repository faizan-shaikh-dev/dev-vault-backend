import express from "express";
import cors from "cors";
import roomRoutes from "./routes/room.routes.js";

const app = express();

//MIDDLEWARE
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://devvault-app.up.railway.app",
];

app.use(
  cors({
    origin: allowedOrigins,
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
