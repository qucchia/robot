import Wheels from "./wheels.js";
import { encode, decode } from "./encode-decode.js"
import WebSocket from "ws";

let wheels = new Wheels(7, 8, 10, 9);
wheels.stop();

let ws = new WebSocket("wss://clouddata.turbowarp.org");

const variables = {};

function setVariable(name, value) {
  console.log(`Setting variable: ${name} = ${value}`);
  variables[name] = value;
  ws.send(JSON.stringify({
    method: "set",
    name,
    value
  }));
}

function getVariable(name) {
  return variables[name];
}

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
      let data = decode(obj.value);

      if (data.from === "client") {
        if (data.type === "connection") {
          setVariable(obj.name, {
            from: "robot",
            type: "connection",
            id: data.id
          });
        } else if (data.type === "move") {
          if (data.direction === "forward") {
            wheels.forward();
          } else if (data.direction === "backward") {
            wheels.backward();
          } else if (data.direction === "left") {
            wheels.left();
          } else if (data.direction === "right") {
            wheels.right();
          } else if (data.direction === "stop") {
            wheels.stop();
          }
        }
      }
    }
  }
}
