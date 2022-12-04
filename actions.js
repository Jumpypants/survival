function moveAction(action){
  switch(action){
    case "up":
      player.y--;
      break;
    case "down":
      player.y++;
      break;
    case "left":
      player.x--;
      break;
    case "right":
      player.x++;
      break;
  }
}
