var code = new Function("state",document.getElementById("code").value);

var constants = {
  fps: 1
};

var display = {
  cw: 900,
  ch: 600,

  gridW: 100,
  gridH: 100,

  bgCol: "green",
  gridCol: "lime",

  treeCol: "brown",
  playerCol: "blue"
};

var seed = 234764646379;
var renderDistance = 5;
