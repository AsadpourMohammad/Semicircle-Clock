var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius *= 0.9;

// Background Color
ctx.globalCompositeOperation = 'destination-under'
ctx.fillStyle = "black";
ctx.fillRect(-200, -200, canvas.width, canvas.height);

// Create Clock
setInterval(drawClock, 1000);

function drawClock() {
  drawCircle(ctx, radius);
  drawBorder(ctx, radius);
  drawCenter(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawCircle(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function drawBorder(ctx, radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "grey";
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
}

function drawCenter(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;

  ctx.beginPath();
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "red";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  // Hour
  hour %= 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (30 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07, "purple");

  // Minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07, "red");
  // second
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02, "yellow");
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.rotate(-pos);
}
