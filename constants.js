// var code = new Function("state",document.getElementById("code").value);
function code(state){
  var m = state.memory;
  if(m.frame === undefined){
    m.frame = 0;
  } else {
    m.frame++;
  }

  if(state.objects.trees.length > 0){
    var c = 0;
    for(var i = 0; i < state.objects.trees.length; i++){
      var x = state.objects.trees[i].x - state.x;
      var y = state.objects.trees[i].y - state.y;
      var cx = state.objects.trees[c].x - state.x;
      var cy = state.objects.trees[c].y - state.y;
      if(Math.abs(x) + Math.abs(y) <
      Math.abs(cx) + Math.abs(cy)){
        c = i;
      }
    }

    var tx = state.objects.trees[c].x;
    var ty = state.objects.trees[c].y;

    function draw(state){
      for(var i = 0; i < state.objects.trees.length; i++){
        var x = state.objects.trees[i].x - state.x;
        var y = state.objects.trees[i].y - state.y;
        if(x == tx - state.x && y == ty - state.y){
          ctx.fillStyle = "purple";
          ctx.fillRect(display.cw / 2 + (x - 0.5) * display.gridW,
            display.ch / 2 + (y - 0.5) * display.gridH,
            display.gridW,
            display.gridH);
        }
      }
      ctx.strokeStyle = "purple";
      ctx.strokeRect((-player.state.vision - 0.5) * display.gridW + display.cw / 2, (-player.state.vision - 0.5) * display.gridH + display.ch / 2, (player.state.vision + 0.5) * display.gridW * 2, (player.state.vision + 0.5) * display.gridH * 2);
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
      }
    } else if(state.x < tx){
      return {
        action: "right",
        memory: m,
        draw: draw
      }
    } else if(state.x > tx){
      return {
        action: "left",
        memory: m,
        draw: draw
      }
    } else if(state.y < ty){
      return {
        action: "down",
        memory: m,
        draw: draw
      }
    } else if(state.y > ty){
      return {
        action: "up",
        memory: m,
        draw: draw
      }
    }
  }

  return {
    action: "up",
    memory: m,
    draw: function(state){
      ctx.strokeStyle = "purple";
      ctx.strokeRect((-player.state.vision - 0.5) * display.gridW + display.cw / 2, (-player.state.vision - 0.5) * display.gridH + display.ch / 2, (player.state.vision + 0.5) * display.gridW * 2, (player.state.vision + 0.5) * display.gridH * 2);
    }
  }
}

const constants = {
  fps: 1,

  trees: {
    startHealth: 1,
    breakFunct: function(){player.state.resources.wood += 1}
  }
};

const display = {
  cw: 900,
  ch: 600,

  gridW: 50,
  gridH: 50,

  bgCol: "green",
  gridCol: "lime",
  gridLineW: 3,

  treeCol: "brown",
  playerCol: "blue"
};

const seed = 237646379;
const renderDistance = 10;
