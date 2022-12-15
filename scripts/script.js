var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = "800";
canvas.height = canvas.width / 1.7;

document.body.style.marginTop = canvas.width / (canvas.width / 200) + "px";

var radius = canvas.width / 2;
ctx.translate(radius, radius);
radius *= 0.9;

// Create Clock
setInterval(drawClock, 0);

function drawClock() {
  drawCircle(ctx, radius);
  drawBorder(ctx, radius);
  //   drawCenter(ctx, radius);
  drawNumbers(ctx, radius);
  drawRec(ctx);
  writeDate(ctx);
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
  ctx.strokeStyle = "black";
  ctx.lineWidth = radius * 0.05;
  ctx.lineCap = "square";
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(
    -canvas.width / 2 + canvas.width / 25.5,
    canvas.width / 41,
    canvas.width - canvas.width / 12.7,
    radius * 0.05
  );
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
  for (num = 0; num <= 24; num += 3) {
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
  var dots = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23];

  ctx.beginPath();
  ctx.font = radius * 0.1 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  for (num = 0; num < dots.length; num++) {
    ang = ((dots[num] - 12) * Math.PI) / 24;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.8);
    ctx.rotate(-ang);
    ctx.fillText("·", 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.8);
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

function drawRec(ctx) {
  // Month
  ctx.beginPath();
  ctx.lineWidth = canvas.width / 70;
  ctx.strokeStyle = "black";
  ctx.rect(
    canvas.width / 12,
    -canvas.width / 15,
    canvas.width / 9,
    canvas.width / 18
  );
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();

  //   // Day
  ctx.beginPath();
  ctx.lineWidth = canvas.width / 70;
  ctx.strokeStyle = "black";
  ctx.rect(
    canvas.width / 4.9,
    -canvas.width / 15,
    canvas.width / 18,
    canvas.width / 18
  );
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.fill();
}

function writeDate(ctx) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  var now = new Date();

  var day = now.getDay();
  var month = now.getMonth();

  // Day
  ctx.beginPath();
  ctx.font = canvas.width / 20 + "px Times";
  ctx.fillStyle = "white";
  ctx.fillText(
    day.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    canvas.width / 4.35,
    -canvas.width / 29
  );

  // Month
  ctx.beginPath();
  ctx.font = canvas.width / 20 + "px Times";
  ctx.fillStyle = "black";
  ctx.fillText(
    months[month].toString(),
    canvas.width / 7.2,
    -canvas.width / 29
  );
}

function drawTime(ctx, radius) {
  var now = new Date();

  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  // Hour
  hour = ((hour - 12) * Math.PI) / 24;
  drawHand(ctx, hour, radius * 0.6, radius * 0.025, "black");
  drawHand(ctx, hour, - radius * 0.03, radius * 0.025, "black");

  // Minute
  minute = ((minute - 30) * Math.PI) / 60;
  drawHand(ctx, minute, radius * 0.85, radius * 0.025, "black");
  drawHand(ctx, minute, - radius * 0.03, radius * 0.025, "black");

  // second
  second = ((second - 30) * Math.PI) / 60;
  //   console.log(second);
  drawHand(ctx, second, radius * 0.94, radius * 0.01, "red");
  drawHand(ctx, second, - radius * 0.03, radius * 0.01, "red");
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
