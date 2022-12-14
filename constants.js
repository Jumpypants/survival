// var code = new Function("state",document.getElementById("code").value);
function code(state){
  var m = state.memory;
  if(m.frame === undefined){
    m.frame = 0;
  } else {
    m.frame++;
  }

  if(state.resources.wood == 15){
    return {
      action: "craft_wooden-pickaxe",
      memory: m,
      draw: function(state){
        ctx.strokeStyle = "purple";
        ctx.strokeRect((-player.state.vision - 0.5) * display.gridW + display.cw / 2, (-player.state.vision - 0.5) * display.gridH + display.ch / 2, (player.state.vision + 0.5) * display.gridW * 2, (player.state.vision + 0.5) * display.gridH * 2);
      }
    }
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

    //a* path
    var obstacles = state.objects.rocks;

    m.path = shortestPath({x: state.x, y: state.y}, {x: tx, y: ty}, obstacles, 1000);

    var nx = m.path[0].x;
    var ny = m.path[0].y;
  } else {
    //a* path
    var obstacles = state.objects.rocks;
    obstacles.push(...state.objects.sheep);

    m.path = shortestPath({x: state.x, y: state.y}, {x: state.x, y: state.y - state.vision - 1}, obstacles, 1000);

    var nx = m.path[0].x;
    var ny = m.path[0].y;
  }

  function draw(state){
    ctx.fillStyle = "white";
    for(var i = 1; i < state.memory.path.length; i++){
      var x = state.memory.path[i].x - state.x;
      var y = state.memory.path[i].y - state.y;
      ctx.fillRect(display.cw / 2 + (x - 0.25) * display.gridW,
        display.ch / 2 + (y - 0.25) * display.gridH,
        display.gridW / 2,
        display.gridH / 2);
    }

    ctx.strokeStyle = "purple";
    ctx.strokeRect((-state.vision - 0.5) * display.gridW + display.cw / 2, (-state.vision - 0.5) * display.gridH + display.ch / 2, (state.vision + 0.5) * display.gridW * 2, (state.vision + 0.5) * display.gridH * 2);

    ctx.font = "" + 20 + "px " + display.font;
    ctx.fillStyle = "black";
    ctx.fillText("health: " + state.health, 10, 50);
    ctx.fillText("hunger: " + state.hunger, 10, 80);
    ctx.fillText("thirst: " + state.thirst, 10, 110);
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
  } else if(state.x == nx - 1) {
    return {
      action: "right",
      memory: m,
      draw: draw
    }
  } else if(state.x == nx + 1) {
    return {
      action: "left",
      memory: m,
      draw: draw
    }
  } else if(state.y == ny - 1) {
    return {
      action: "down",
      memory: m,
      draw: draw
    }
  } else if(state.y == ny + 1) {
    return {
      action: "up",
      memory: m,
      draw: draw
    }
  }
}

const constants = {
  fps: 5,

  trees: {
    startHealth: 3,
    breakFunct: function(){player.state.resources.wood += 1}
  },
  rocks: {
    startHealth: 100,
    breakFunct: function(){player.state.resources.stone += 1}
  },
  sheep: {
    startHealth: 100,
    breakFunct: function(){player.state.resources.stone += 1}
  },
  items: {
    woodenPickaxeWoodCost: 15,
    woodenPickaxeBreakPower: 50
  },
  actions: {
    moveHungerCost: 2,
    moveThirstCost: 2,
    breakHungerCost: 5,
    breakThirstCost: 6,
    craftHungerCost: 7,
    craftThirstCost: 6
  }
};

const display = {
  cw: 900,
  ch: 600,

  font: "Arial",

  gridW: 50,
  gridH: 50,

  bgCol: "green",
  gridCol: "lime",
  gridLineW: 3,

  treeCol: "brown",
  rockCol: "gray",
  sheepCol: "white",
  playerCol: "blue",

  //game over
  gameOverBgCol: "green",
  gameOverFontSize: 50,
  gameOverFontCol: "black",
  gameOverXOffset: -230,
  gameOverYOffset: -25,
  gameOverText: "Game Over! Score: "
};

const seed = 237646379;
const renderDistance = 10;
