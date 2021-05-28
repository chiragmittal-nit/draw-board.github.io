const colors = document.getElementsByClassName("controls-color");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 900;

// The Canvas API provides a means for drawing graphics via JavaScript and the HTML <canvas> element.
// The Canvas API largely focuses on 2D graphics

const canvas = document.getElementById("jsCanvas");

// *****we need to specify canvas element height & width explicitly on element whether or not in css does matters. *****
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

// To Draw on canvas, you need a drawing object for the canvas.
// The getContext() method gets that element's context : the thing onto which the drawing will be rendered.
const ctx = canvas.getContext("2d");

let drawing = false;
let filling = false;

ctx.fillStyle = "white"; // bg-color of canvas
ctx.strokeStyle = "#2c2c2c"; // color of every pixel

ctx.fillRect(0, 0, canvas.width, canvas.height); // intially coloring the canvas.
ctx.lineWidth = 2.5; // since we set input element range to be default of 2.5

function stopDrawing() {
  drawing = false;
}

function startDrawing() {
  drawing = true;
}

function handleCanvasClick(e) {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  if (filling) {
    ctx.fillStyle = color;
  } else {
    ctx.strokeStyle = color;
  }
}

function handleRangeChange(e) {
  ctx.lineWidth = e.target.value;
}

function handleModeClick(e) {
  if (filling == false) {
    filling = true;
    e.target.textContent = "draw";
  } else {
    filling = false;
    e.target.textContent = "fill";
  }
}

function handleSaveClick(e) {
  const image = canvas.toDataURL(); // default ".png"
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs"; // this attr. instructs the browser to download a URL, instead of going there.
  link.click();
}

function handleClearClick(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ctx.lineTo(x, y); => it draws a transparent line from previous recorded (x, y) that was actually moveTo(x, y) hence
// say previous was (x, y) then next could be : (x +- 1, y +- 1).
// ctx.stroke() actually fills color in that line which is essentially a point.
// Therefore, line is made by stroking point by point.

function onMouseMove(event) {
  // offset gives the coordinates w.r.t. canvas element not full screen.
  const x = event.offsetX;
  const y = event.offsetY;
  if (!filling) {
    if (!drawing) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // moving mouse in canvas element
  canvas.addEventListener("mousedown", startDrawing); // mouse click on canvas element
  canvas.addEventListener("mouseup", stopDrawing); // mouse click release on canvas element
  canvas.addEventListener("mouseleave", stopDrawing); // moving mouse out of canvas element
  canvas.addEventListener("click", handleCanvasClick);

  // so that right click disables on canvas
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

if (range) {
  range.addEventListener("change", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
