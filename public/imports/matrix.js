import { LedMatrix } from "https://www.unpkg.com/@fabwaseem/easy-led-matrix@1.3.1/easy-led-matrix.min.js";
const container = document.querySelector("#container");

let config = {
    shape: "square",
    size: 12,
    color: "#161819",
    amount: 1000,
    gap: 3,
    litColor: "#28282B",
    fps: 24,
    noise: 0.01,
    background: "#000000",
  }


const matrix = new LedMatrix(container, config);
matrix.init()