import Room from "../models/Room.js";
import generateRoomId from "../utils/generateRoomId.js";

/* CREATE ROOM */
export const createRoom = async (req, res) => {
  try {
    const { roomName, password } = req.body;

    if (!roomName) {
      return res.status(400).json({ message: "roomName is required" });
    }

    const room = await Room.create({
      roomId: generateRoomId(),
      roomName,
      password: password || null,
      code: "",
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* JOIN ROOM */
export const joinRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.password && room.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ROOM BY ID */
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE CODE */
export const updateCode = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomId: req.params.roomId },
      { code: req.body.code },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL ROOMS */
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select("roomId roomName createdAt");

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Delete Room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.password && room.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    await Room.deleteOne({ roomId });

    res.status(200).json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};