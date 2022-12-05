function drawBg(){
  ctx.fillStyle = display.bgCol;
  ctx.fillRect(0, 0, display.cw, display.ch);
}

function drawGrid(){
  var gw = display.gridW;
  for(var i = 0; i < display.cw / gw / 2; i++){
    ctx.strokeStyle = display.gridCol;
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
  var gh = display.gridH;
  for(var i = 0; i < display.ch / gh / 2; i++){
    ctx.strokeStyle = display.gridCol;
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

function drawTrees(){
  for(var i = 0; i < trees.length; i++){
    ctx.fillStyle = display.treeCol;
    var x = trees[i].x - player.state.x;
    var y = trees[i].y - player.state.y;
    ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
                 display.ch / 2 + (y - 0.5) * display.gridH,
                 display.gridW,
                 display.gridH);
  }
}
