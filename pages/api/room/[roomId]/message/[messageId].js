import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomIDX = rooms.findIndex((x) => x.roomId === roomId);

    if (roomIDX === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room ID" });
    }
    const textidx = rooms[roomIDX].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (textidx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid message ID" });
    }
    rooms[roomIDX].messages.splice(textidx, 1);
    writeDB(rooms);

    return res.json({ ok: true });
  }
}
