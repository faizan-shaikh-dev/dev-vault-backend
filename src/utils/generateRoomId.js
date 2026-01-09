import { nanoid } from "nanoid";

const generateRoomId = () => {
  return nanoid(6).toUpperCase();
};

export default generateRoomId;
