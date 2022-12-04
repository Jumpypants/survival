function runCode(){
  var out = code({...player.state});
  console.log(out);
  //move
  if(out.action == "up"
  || out.action == "down"
  || out.action == "left"
  || out.action == "right"){
    moveAction(out.action);
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

function whichObject(x, y) {
  var hashCode = hash({x: x, y: y}, seed);
  var category = hashCode % 15;

  switch (category) {
    case 0:
      return "tree";
   default:
      return "air";
  }
}

function genObjects(){
  //trees
  trees = [];
  for(var i = -renderDistance; i <= renderDistance; i++){
    for(var j = -renderDistance; j <= renderDistance; j++){
      if(whichObject(player.x + i, player.y + j) == "tree"){
        trees.push({x: i,y: j});
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
