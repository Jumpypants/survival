function loop(){
  switch (gameState) {
    case "running":
      updateObjects();
      updatePlayer();
      runCode();
      updateObjects();
      updatePlayer();
      checkGameOver();
      //draw
      drawBg();
      drawGrid();
      drawObjects();
      drawPlayer();
      player.drawFunction(player.state);
      console.log(player.state);
      score++;
      break;
    case "lose":
      drawGameOver();
      loop = null;
      break;
  }
}
