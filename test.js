import Wheels from "./wheels.js";
import WebSocket from "ws";

let ws = new WebSocket("wss://clouddata.turbowarp.org");
let wheels = new Wheels(7, 8, 10, 9);
wheels.stop();

ws.onopen = () => {
  console.log("Performing handshake");
  
  ws.send(JSON.stringify({
    method: "handshake",
    project_id: process.env.PROJECT_ID,
    user: "qucchia"
  }));
};

ws.onmessage = (event) => {
  for (const message of event.data.split("\n")) {
    const obj = JSON.parse(message);
    if (obj.method === "set") {
      if (obj.name === "☁ Move") {
        if (obj.value === 0) {
          wheels.stop();
        } else  if (obj.value === 1) {
          wheels.forward();
        } else if (obj.value === 2) {
          wheels.left();
        } else if (obj.value === 3) {
          wheels.right();
        } else if (obj.value === 4) {
          wheels.backward();
        }
      }
    }
  }
}
