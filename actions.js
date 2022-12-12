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
  var objX = player.state.x;
  var objY = player.state.y;
  switch(action){
    case "break_up":
      objY--;
      break;
    case "break_down":
      objY++;
      break;
    case "break_left":
      objX--;
      break;
    case "break_right":
      objX++;
      break;
  }
  obj = whichObject(objX, objY);
  if(isBreakable(obj)){
    var newObj = { ...obj };
    newObj.health -= player.state.breakPower;
    if(newObj.health <= 0){
      newObj = defaultAir;
      switch(obj.type){
        case "tree":
          constants.trees.breakFunct();
          break;
        default:
          break;
      }
    }
    objectMap.set(coordinateKey(objX, objY), newObj);
  }
}
