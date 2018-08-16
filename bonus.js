var maxFlakes = 25;
var flakesArray = [];
var treesArray = [];
var fansArray = [];
var mogulArray = [];
var angle = 0;

//Images
var trees = new Image();
trees.src = 'images/Snowy_Tree.jpg';
var fans = new Image();
fans.src = 'images/fans.jpg';
var mogulImg = new Image();
mogulImg.src = '/images/moguls.png';

function Bonus(x, y, width, height, imgSrc, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.width = width;
  this.height = height;
}

function Tree(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.crashed = false;
  this.drawTrees = function() {
    this.ctx.drawImage(trees, this.x, this.y, this.width, this.height);
  };
}

function createTrees() {
  var y = canvasHeight;
  var x = Math.floor(Math.random() * canvasWidth);
  treesArray.push(new Tree(x, y, 80, 80, ctx));
}
function updateTrees() {
  for (i = 0; i < treesArray.length; i++) {
    treesArray[i].y -= 10;
    treesArray[i].drawTrees();
    if (treesArray[i].y < -80) {
      treesArray.splice(i, 1);
    }

    if (treesArray.length > 0 && !treesArray[i].crashed && racer.deductPoints(treesArray[i])) {
      console.log(treesArray[i].crashed);
      console.log('inside trees deduction');
      treesArray[i].crashed = true;
      score--;
    }
  }
}

//moguls
function Mogul(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;

  this.drawMogul = function() {
    this.ctx.drawImage(mogulImg, this.x, this.y, this.width, this.height);
  };
}

function createMogul() {
  var y = canvasHeight;
  var x = Math.floor(Math.random() * canvasWidth);
  mogulArray.push(new Mogul(x, y, 200, 30, ctx));
}

function updateMogul() {
  for (i = 0; i < mogulArray.length; i++) {
    mogulArray[i].y -= 10;
    mogulArray[i].drawMogul();
    if (mogulArray[i].y < -80) {
      mogulArray.splice(i, 1);
    }
  }
}

//fans

function Fans(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.drawFans = function() {
    this.ctx.drawImage(fans, this.x, this.y, this.width, this.height);
  };
}

function createFans() {
  var y = canvasHeight + 300;
  var x = Math.floor(Math.random() * (canvasWidth + 300) - 300);
  fansArray.push(new Fans(x, y, 200, 200, ctx));
}
//
// function updateFans(){
//     for (i = 0; i < fansArray.length; i++) {
//         fansArray[i].y -= 10;
//         fansArray[i].drawFans();
// }

//snowflakes
function createSnowflakes() {
  for (var i = 0; i < maxFlakes; i++) {
    flakesArray.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      r: Math.random() * 4 + 1,
      d: Math.random() * maxFlakes
    });
  }
}

function drawSnowflakes() {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  for (var i = 0; i < maxFlakes; i++) {
    var p = flakesArray[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  ctx.restore();
}

function updateSnowflakes() {
  angle += 0.01;
  for (var i = 0; i < maxFlakes; i++) {
    var p = flakesArray[i];

    //Updating X and Y coordinates
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(angle) * 2;

    //Sending flakes back from the top when it exits
    //Lets make it a bit more organic and let flakes enter from the left and right also.
    if (p.x > canvasWidth + 5 || p.x < -5 || p.y > canvasHeight) {
      if (i % 3 > 0) {
        //66.67% of the flakes
        flakesArray[i] = { x: Math.random() * canvasWidth, y: -10, r: p.r, d: p.d };
      } else {
        //If the flake is exitting from the right
        if (Math.sin(angle) > 0) {
          //Enter from the left
          flakesArray[i] = { x: -5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        } else {
          //Enter from the right
          flakesArray[i] = { x: canvasWidth + 5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        }
      }
    }
  }
}
