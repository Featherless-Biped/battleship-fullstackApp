import http from "http";
import { Server } from "socket.io";

export default class WS {
  rooms = [];
  gameState = {};
  constructor(app) {
    const server = http.createServer(app);
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
      this.onConnection(socket);
      socket.on("disconnect", () => this.onDisconnect(socket));
      socket.on("deployed", () => this.onDeployed(socket));
      socket.on("shot", (coords) => this.onShot(socket, coords));
      socket.on("hit", (coords, state, shipId) =>
        this.onHit(socket, coords, state, shipId)
      );
      socket.on("game-over", () => this.onGameOver(socket));
    });

    const PORT = process.env.WS_PORT || 3002;
    server.listen(PORT, () => {
      console.log(`ws is listening on port ${PORT}`);
    });
  }
  onGameOver(socket) {
    const roomNum = this.getRoomNum(socket.id);
    socket.to(roomNum).emit("game-over", true);
    socket.emit("game-over", false);
  }
  onShot(socket, coords) {
    const roomNum = this.getRoomNum(socket.id);
    socket.to(roomNum).emit("shot", coords);
  }

  onHit(socket, coords, state, shipId) {
    const roomNum = this.getRoomNum(socket.id);
    socket.to(roomNum).emit("hit", coords, state, shipId);
  }
  onDeployed(socket) {
    const roomNum = this.getRoomNum(socket.id);

    const roomId = this.rooms[roomNum][0] + this.rooms[roomNum][1];
    const state = this.gameState[roomId];
    if (state === "deployment0") this.gameState[roomId] = "deployment1";
    else {
      this.gameState[roomId] = "battle";
      socket.emit("battle", false);
      socket.to(roomNum).emit("battle", true);
    }
  }

  onConnection(socket) {
    const roomNum = this.findAvailableRoom();
    this.joinRoom(roomNum, socket);
  }

  onDisconnect(socket) {
    for (const room of this.rooms) {
      const i = room.indexOf(socket.id);
      if (i !== -1) room.splice(i, 1);
    }
  }

  joinRoom(roomNum, socket) {
    this.rooms[roomNum] =
      this.rooms[roomNum] === undefined
        ? [socket.id]
        : [...this.rooms[roomNum], socket.id];

    socket.join(roomNum);

    const room = this.rooms[roomNum];
    if (this.rooms[roomNum].length === 2) {
      socket.emit("deployment");
      socket.to(roomNum).emit("deployment");
      this.gameState[room[0] + room[1]] = "deployment0";
    }
  }

  getRoomNum(id) {
    for (let i = 0; i < this.rooms.length; i++) {
      const index = this.rooms[i].findIndex((x) => x === id);
      if (index !== -1) return i;
    }
  }

  findAvailableRoom() {
    const index = this.rooms.findIndex((x) => x.length < 2);
    return index > -1 ? index : this.rooms.length;
  }
}
