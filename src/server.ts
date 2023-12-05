import Server from "./app";
import ConnectionInstance from "./lib/Connection.js";
const server = new Server();
server.start();
ConnectionInstance.connectDb();
