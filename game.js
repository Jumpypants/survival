var player = {
  state: {
    objects: {trees: [], rocks: [], sheep: []},
    memory: {},
    x: 0,
    y: 0,
    vision: 4,
    breakPower: 1,
    attackPower: 1,
    resources: {wood: 0, stone: 0},

    health: 100,
    hunger: 100,
    thirst: 100
  },
  drawFunction: function(){}
};

var objects = {trees: [], rocks: [], sheep: []};

var objectMemory = [];

var score = 0;

var gameState = "running";
