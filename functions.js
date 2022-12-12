function runCode(){
  var out = code({...player.state});
  console.log(out);
  player.drawFunction = out.draw;
  //action
  switch (out.action) {
    case "up":
    case "down":
    case "left":
    case "right":
      moveAction(out.action);
      break;
    case "break_up":
    case "break_down":
    case "break_left":
    case "break_right":
      breakAction(out.action);
      break;
    default:
      break;
  }

  //memory
  player.state.memory = out.memory;
}

function hash(obj, seed) {
    var str = JSON.stringify(obj);
    var i, l, hval = seed;
    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
}

function coordinateKey(x, y) {
  return x + "," + y;
}

function whichObjectType(x, y) {
  var hashCode = hash({x: x, y: y}, seed);
  var category = hashCode % 15;

  switch (category) {
    case 0:
      return "tree";
   default:
      return "air";
  }
}

const defaultTree = { type: "tree", health: constants.trees.startHealth };
const defaultAir = { type: "air" };

function defaultObject(type) {
  switch(type) {
    case "tree": return defaultTree;
    case "air": return defaultAir;
  }
}

var objectMap = new Map();

function whichObject(x, y) {
  var fromMap = objectMap.get(coordinateKey(x, y));
  if (fromMap !== undefined) {
    return fromMap;
  }
  return defaultObject(whichObjectType(x, y));
}

function isSolid(obj){
  switch (obj.type) {
    case "tree":
      return true;
      break;
    default:
      return false;
  }
}

function isBreakable(obj){
  switch (obj.type) {
    case "tree":
      return true;
      break;
    default:
      return false;
  }
}

function updateObjects(){
  //trees
  objects.trees = [];
  for(var x = player.state.x - renderDistance; x <= player.state.x + renderDistance; x++){
    for(var y = player.state.y - renderDistance; y <= player.state.y + renderDistance; y++){
      var obj = whichObject(x, y);
      if(obj.type == "tree"){
        objects.trees.push({x: x, y: y, obj: obj});
      }
    }
  }
}

function updatePlayer(){
  //trees
  player.state.objects.trees = [];
  for(var i = 0; i < objects.trees.length; i++){
    var x = objects.trees[i].x - player.state.x;
    var y = objects.trees[i].y - player.state.y;
    if(x <= player.state.vision
    && x >= -player.state.vision
    && y <= player.state.vision
    && y >= -player.state.vision){
      player.state.objects.trees.push(objects.trees[i]);
    }
  }
}
