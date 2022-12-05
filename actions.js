function moveAction(action){
  var newX = player.state.x;
  var newY = player.state.y;
  switch(action){
    case "up":
      newY--;
      break;
    case "down":
      newY++;
      break;
    case "left":
      newX--;
      break;
    case "right":
      newX++;
      break;
  }
  if(!isSolid(whichObject(newX, newY))){
    player.state.x = newX;
    player.state.y = newY;
  }
}

function breakAction(action){
  var obX = player.state.x;
  var obY = player.state.y;
  switch(action){
    case "break_up":
      obY--;
      break;
    case "break_down":
      obY++;
      break;
    case "break_left":
      obX--;
      break;
    case "break_right":
      obX++;
      break;
  }
  obj = whichObject(obX, obY);
  if(isBreakable(obj)){
    var newObj = { ...obj };
    newObj.health -= player.breakPower;
    if (newObj.health <= 0) {
      newObj = defaultAir;
    }
    objectMap.set(coordinateKey(obX, obY), newObj);
  }
}
