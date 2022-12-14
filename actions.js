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
    changePlayerStats(constants.actions.moveHungerCost, constants.actions.moveThirstCost);
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
        case "rock":
          constants.rocks.breakFunct();
          break;
        default:
          break;
      }
    }
    objectMap.set(coordinateKey(objX, objY), newObj);
    changePlayerStats(constants.actions.breakHungerCost, constants.actions.breakThirstCost);
  }
}

function attackAction(action){
  var objX = player.state.x;
  var objY = player.state.y;
  switch(action){
    case "attack_up":
      objY--;
      break;
    case "attack_down":
      objY++;
      break;
    case "attack_left":
      objX--;
      break;
    case "attack_right":
      objX++;
      break;
  }
  obj = whichObject(objX, objY);
  if(isAttackable(obj)){
    var newObj = { ...obj };
    newObj.health -= player.state.AttackPower;
    if(newObj.health <= 0){
      newObj = defaultAir;
      switch(obj.type){
        case "sheep":
          constants.sheep.breakFunct();
          break;
        default:
          break;
      }
    }
    objectMap.set(coordinateKey(objX, objY), newObj);
    changePlayerStats(constants.actions.breakHungerCost, constants.actions.breakThirstCost);
  }
}

function craftWoodenPickaxeAction(){
  if(player.state.resources.wood >= constants.items.woodenPickaxeWoodCost){
    player.state.resources.wood -= constants.items.woodenPickaxeWoodCost;
    player.state.breakPower = constants.items.woodenPickaxeBreakPower;
    changePlayerStats(constants.actions.craftHungerCost, constants.actions.craftThirstCost);
  }
}
