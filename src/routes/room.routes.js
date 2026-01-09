import express from "express";
import {
  createRoom,
  joinRoom,
  getRoomById,
  updateCode,
  getAllRooms,
} from "../controllers/room.controller.js";

const router = express.Router();

//CREATE ROOM
router.post("/create", createRoom);

//JOIN ROOM
router.post("/join", joinRoom);

//GET ALL ROOMS
router.get("/", getAllRooms);

//GET SINGLE ROOM
router.get("/:roomId", getRoomById);

//UPDATE CODE
router.put("/:roomId/code", updateCode);

export default router;
