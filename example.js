var memory = state.memory;
console.log(memory);
if(memory.dir == null){
  memory.dir = 0;
}
if(memory.move == 0 || memory.move == null){
  memory.dir = Math.floor(Math.random() * 4);
  memory.move = Math.floor(Math.random() * 10) + 1;
}
switch(memory.dir){
  case 0:
    memory.move--;
    return {
      action: "left",
      memory: state.memory
    }
  case 1:
    memory.move--;
    return {
      action: "right",
      memory: state.memory
    }
  case 2:
    memory.move--;
    return {
      action: "up",
      memory: state.memory
    }
  case 3:
    memory.move--;
    return {
      action: "down",
      memory: memory
    }
}
