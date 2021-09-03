import Wheels from "./wheels.js";
let wheels = new Wheels(10, 9, 8, 7);

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

wheels.forward();
await delay(3000);
wheels.stop();
