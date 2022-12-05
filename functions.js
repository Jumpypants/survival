function runCode(){
  var out = code({...player.state});
  console.log(out);
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

const defaultTree = { type: "tree", health: constants.treeStartHealth };
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

function isSolid(ob){
  switch (ob.type) {
    case "tree":
      return true;
      break;
    default:
      return false;
  }
}

function isBreakable(ob){
  switch (ob.type) {
    case "tree":
      return true;
      break;
    default:
      return false;
  }
}

function genObjects(){
  //trees
  trees = [];
  for(var x = player.state.x - renderDistance; x <= player.state.x + renderDistance; x++){
    for(var y = player.state.y - renderDistance; y <= player.state.y + renderDistance; y++){
      var obj = whichObject(x, y);
      if(obj.type == "tree"){
        trees.push({x: x,y: y, obj: obj});
      }
    }
  }
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
