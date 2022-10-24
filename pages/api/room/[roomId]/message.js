import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const rommIDX = rooms.findIndex((x) => x.roomId === roomId);
    if (rommIDX === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room ID" });
    }
    return res.json({ ok: true, messages: rooms[rommIDX].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    //read request body
    const text = req.body.text;
    const rommIDX = rooms.findIndex((x) => x.roomId === roomId);
    if (rommIDX === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room ID" });
    }
    if (typeof text !== "string") {
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    }
    //create new id
    const newId = uuidv4();
    const newnessage = { message: newId, text };
    rooms[rommIDX].messages.push(newnessage);
    writeDB(rooms);
    return res.json({ ok: true, newnessage });
  }
}
