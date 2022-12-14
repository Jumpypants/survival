function drawBg(){
  ctx.fillStyle = display.bgCol;
  ctx.fillRect(0, 0, display.cw, display.ch);
}

function drawGrid(){
  var gw = display.gridW;
  var gh = display.gridH;
  ctx.strokeStyle = display.gridCol;
  ctx.lineWidth = display.gridLineW;

  for(var i = 0; i < display.cw / gw / 2; i++){
    //vertical right side
    ctx.beginPath();
    ctx.moveTo(gw * i + gw / 2 + display.cw / 2, 0);
    ctx.lineTo(gw * i + gw / 2 + display.cw / 2, display.ch);
    ctx.stroke();
    //vertical left side
    ctx.beginPath();
    ctx.moveTo(gw * -i - gw / 2 + display.cw / 2, 0);
    ctx.lineTo(gw * -i - gw / 2 + display.cw / 2, display.ch);
    ctx.stroke();
  }
  for(var i = 0; i < display.ch / gh / 2; i++){
    //horizantal top
    ctx.beginPath();
    ctx.moveTo(0, gh * i + gh / 2 + display.ch / 2);
    ctx.lineTo(display.cw , gh * i + gh / 2 + display.ch / 2);
    ctx.stroke();
    //horizantal bottom
    ctx.beginPath();
    ctx.moveTo(0, gh * -i - gh / 2 + display.ch / 2);
    ctx.lineTo(display.cw , gh * -i - gh / 2 + display.ch / 2);
    ctx.stroke();
  }
}

function drawPlayer(){
  ctx.fillStyle = display.playerCol;
  ctx.fillRect(display.cw / 2 - display.gridW / 2,
  display.ch / 2 - display.gridH / 2,
  display.gridW,
  display.gridH);
}

function drawObjects(){
  //trees
  for(var i = 0; i < objects.trees.length; i++){
    ctx.fillStyle = display.treeCol;
    var x = objects.trees[i].x - player.state.x;
    var y = objects.trees[i].y - player.state.y;
    ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
      display.ch / 2 + (y - 0.5) * display.gridH,
      display.gridW,
      display.gridH);
  }
  //rocks
  for(var i = 0; i < objects.rocks.length; i++){
    ctx.fillStyle = display.rockCol;
    var x = objects.rocks[i].x - player.state.x;
    var y = objects.rocks[i].y - player.state.y;
    ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
      display.ch / 2 + (y - 0.5) * display.gridH,
      display.gridW,
      display.gridH);
  }
  //sheep
  for(var i = 0; i < objects.sheep.length; i++){
    ctx.fillStyle = display.sheepCol;
    var x = objects.sheep[i].x - player.state.x;
    var y = objects.sheep[i].y - player.state.y;
    ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
      display.ch / 2 + (y - 0.5) * display.gridH,
      display.gridW,
      display.gridH);
  }
}

function drawGameOver(){
  ctx.fillStyle = display.gameOverBgCol;
  ctx.fillRect(0, 0, display.cw, display.ch);

  ctx.font = "" + display.gameOverFontSize + "px " + display.font;
  ctx.fillStyle = display.gameOverFontCol;
  ctx.fillText(display.gameOverText + score, display.cw / 2 + display.gameOverXOffset, display.ch / 2 + display.gameOverYOffset);
}
