import Room from "../models/Room.Modal.js";
import generateRoomId from "../utils/generateRoomId.js";

/* ===============================
   CREATE ROOM
================================ */
export const createRoom = async (req, res) => {
  try {
    const { roomName, password } = req.body;

    if (!roomName) {
      return res.status(400).json({ message: "roomName is required" });
    }

    // normalize password: null = public room
    const safePassword =
      password && password.trim() ? password.trim() : null;

    const room = await Room.create({
      roomId: generateRoomId(),
      roomName,
      password: safePassword,
      code: "",
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   JOIN ROOM
================================ */
export const joinRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;

    if (!roomId) {
      return res.status(400).json({ message: "roomId missing" });
    }

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // private room check
    if (room.password !== null) {
      if (!password) {
        return res.status(401).json({ message: "Password required" });
      }

      if (room.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ROOM BY ID
================================ */
export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE CODE
================================ */
export const updateCode = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { code } = req.body;

    const room = await Room.findOneAndUpdate(
      { roomId },
      { code },
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

/* ===============================
   GET ALL ROOMS
================================ */
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select(
      "roomId roomName password createdAt"
    );

    const formattedRooms = rooms.map((room) => ({
      roomId: room.roomId,
      roomName: room.roomName,
      hasPassword: room.password !== null,
      createdAt: room.createdAt,
    }));

    res.json(formattedRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE ROOM
================================ */
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { password } = req.body;

    if (!roomId) {
      return res.status(400).json({ message: "roomId missing" });
    }

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.password !== null) {
      if (!password) {
        return res.status(401).json({ message: "Password required" });
      }

      if (room.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }
    }

    await Room.deleteOne({ roomId });

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
