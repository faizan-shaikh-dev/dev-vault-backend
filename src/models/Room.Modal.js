import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    roomId: {
      type: String,
      required: true,
      unique: true,
    },

   
    roomName: {
      type: String,
      required: true,
      trim: true,
    },

  
    password: {
      type: String,
      default: null,
    },

   
    code: {
      type: String,
      default: "javascript",
    },

   
    code: {
      type: String,
      default: "",
    },

},{timestamps:true});

export default mongoose.model("Room", roomSchema);