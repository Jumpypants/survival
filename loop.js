function loop(){
  updateObjects();
  updatePlayer();
  runCode();
  updateObjects();
  updatePlayer();
  //draw
  drawBg();
  drawGrid();
  drawTrees();
  drawPlayer();
  player.drawFunction(player.state);
  console.log(player.state);
}
