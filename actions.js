function moveAction(action){
  switch(action){
    case "up":
      player.state.y--;
      break;
    case "down":
      player.state.y++;
      break;
    case "left":
      player.state.x--;
      break;
    case "right":
      player.state.x++;
      break;
  }
}
