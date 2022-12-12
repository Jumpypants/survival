var m = state.memory;
if(m.frame === undefined){
  m.frame = 0;
} else {
  m.frame++;
}

if(state.trees.length > 0){
  var c = 0;
  for(var i = 0; i < state.trees.length; i++){
    var x = state.trees[i].x - state.x;
    var y = state.trees[i].y - state.y;
    var cx = state.trees[c].x - state.x;
    var cy = state.trees[c].y - state.y;
    if(Math.abs(x) + Math.abs(y) <
    Math.abs(cx) + Math.abs(cy)){
      c = i;
    }
  }
  var tx = state.trees[c].x;
  var ty = state.trees[c].y;

  function draw(){
    for(var i = 0; i < state.trees.length; i++){
      var x = state.trees[i].x - state.x;
      var y = state.trees[i].y - state.y;
      ctx.fillStyle = "red";
      if(x == tx && y = ty){
        ctx.fillStyle = "purple";
      }
      ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
        display.ch / 2 + (y - 0.5) * display.gridH,
        display.gridW,
        display.gridH);
    }
    ctx.strokeStyle = "purple";
    ctx.beginPath();
    ctx.rect((-player.state.vision - 0.5) * display.gridW + display.cw / 2, (-player.state.vision - 0.5) * display.gridH + display.ch / 2, (player.state.vision + 0.5) * display.gridW * 2, (player.state.vision + 0.5) * display.gridH * 2);
    ctx.stroke();
  }

  if(state.y == ty && state.x == tx + 1){
    return {
      action: "break_left",
      memory: m,
      draw: draw
    }
  } else if(state.y == ty && state.x == tx - 1){
    return {
      action: "break_right",
      memory: m,
      draw: draw
    }
  } else if(state.x == tx && state.y == ty + 1){
    return {
      action: "break_up",
      memory: m,
      draw: draw
    }
  } else if(state.x == tx && state.y == ty - 1){
    return {
      action: "break_down",
      memory: m,
      draw: draw
  } else if(state.x < tx){
    return {
      action: "right",
      memory: m,
      draw: draw
  } else if(state.x > tx){
    return {
      action: "left",
      memory: m,
      draw: draw
  } else if(state.y < ty){
    return {
      action: "down",
      memory: m,
      draw: draw
  } else if(state.y > ty){
    return {
      action: "up",
      memory: m,
      draw: draw
  }
}

return {
  action: "up",
  memory: m,
  draw: draw
}
