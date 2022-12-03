function runCode(){
  var out = code(player.state);
  for(var i = 0; i < objects.length; i++){
    for(var j = 0; j < objects[i].length; j++){
      switch(out.move){
        case "up":
          objects[i][j].y++;
          break;
        case "down":
          objects[i][j].y--;
          break;
        case "left":
          objects[i][j].x++;
          break;
        case "right":
          objects[i][j].x--;
          break;
      }
    }
  }
}

function updateObjects(){
  objects = [];
  objects.push(trees);
}

function updatePlayer(){
  player.state.trees = [];
  for(var i = 0; i < trees.length; i++){
    if(trees[i].x <= player.vision
    && trees[i].x >= -player.vision
    && trees[i].y <= player.vision
    && trees[i].y >= -player.vision){
      player.state.trees.push(trees[i]);
    }
  }
}
