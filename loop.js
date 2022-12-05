function loop(){
  //console.log(player.state);
  console.log(objectMap);
  console.log(objectMap.get({x:1, y:-1}))
  genObjects();
  updatePlayer();
  runCode();
  drawBg();
  drawGrid();
  drawTrees();
  drawPlayer();
}
