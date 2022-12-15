var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius *= 0.9;
setBackgroundColor("black");

function setBackgroundColor(color) {
  ctx.globalCompositeOperation = "destination-under";
  ctx.fillStyle = color;
  ctx.fillRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
}

// Create Clock
setInterval(drawClock, 0);

function drawClock() {
  drawCircle(ctx, radius);
  drawBorder(ctx, radius);
  //   drawCenter(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawCircle(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI - 0.05, 0.05);
  ctx.fillStyle = "white";
  ctx.fill();
}

function drawBorder(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI - 0.0266, 0.0266);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = radius * 0.05;
  ctx.lineCap = "square";
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

  // Hour Numbers
  ctx.beginPath();
  ctx.font = radius * 0.1 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  for (num = 0; num <= 24; num += 2) {
    ang = ((num - 12) * Math.PI) / 24;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.8);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.8);
    ctx.rotate(-ang);
  }

  // Hour Dots
  ctx.beginPath();
  ctx.font = radius * 0.1 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "green";
  for (num = 1; num <= 24; num += 2) {
    ang = ((num - 12) * Math.PI) / 24;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText("", 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }

  // Minute Numbers
  ctx.beginPath();
  ctx.font = radius * 0.05 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "grey";
  for (num = 0; num <= 60; num += 2) {
    ang = ((num - 30) * Math.PI) / 60;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.91);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.91);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  // Hour
  hour = ((hour - 12) * Math.PI) / 24;
  drawHand(ctx, hour, radius * 0.6, radius * 0.025, "black");

  // Minute
  minute = ((minute - 30) * Math.PI) / 60;
  drawHand(ctx, minute, radius * 0.85, radius * 0.025, "black");
  // second
  second = ((second - 30) * Math.PI) / 60;
//   console.log(second);
  drawHand(ctx, second, radius * 0.94, radius * 0.01, "red");
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "square";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.rotate(-pos);
}
