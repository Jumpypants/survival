function loop(){
  updateObjects();
  updatePlayer();
  runCode();
  updateObjects();
  updatePlayer();
  //draw
  drawBg();
  drawGrid();
  drawObjects();
  drawPlayer();
  player.drawFunction(player.state);
  console.log(player.state);
}
