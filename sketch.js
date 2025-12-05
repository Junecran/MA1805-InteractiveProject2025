    // -- 'Safety Search' -- //

   // -- Data -- //
let player;
let enemies = [];
let showMenu = true;   // menu overlay is visible
let offsetX = 0;
let offsetY = 0;



  // Map Setup //
let tileSize = 20;
let cols = 20;
let rows = 20;
let maze = [ 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,1,1],
[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,1],
[1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1,1],
[1,1,0,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1],
[1,1,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,0,1],
[1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
[1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,1],
[1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
[1,0,0,1,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,1,0,1],
[1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,1,1,1,1],
[1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1],
[1,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,0,1],
[1,0,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,0,1,1,1,0,0,1],
[1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1,1],
[1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1],
[1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,0,0,0,0,1,1],
[1,0,0,0,0,1,1,1,0,1,1,1,0,0,1,0,1,1,1,1,1,0,0,1],
[1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,1,1,1,1,0,1],
[1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,0,0,1],
[1,0,1,1,0,1,1,0,0,1,1,1,0,0,0,1,1,0,1,1,0,1,1,1],
[1,0,1,1,0,1,1,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1],
[1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1],
[1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

   // -- Fuctions -- //
 function updateOffsets() {
  offsetX = (width - cols * tileSize) / 2;
  offsetY = (height - rows * tileSize) / 2;
}

function drawLetter(x, y, letter, c) {
  fill(c);
  text(letter, x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSize = floor(min(width / cols, height / rows));
  updateOffsets();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  cols = maze[0].length;
  rows = maze.length;
  tileSize = floor(min(width / cols, height / rows));
  updateOffsets();

  player = new Player(10, 28);

  enemies.push(new Enemy(8, 1));
  enemies.push(new Enemy(7, 9));
}


  // Maze Creation //
function drawMaze() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 1) fill(0, 0, 255);
      else if (maze[y][x] === 3) fill(0, 255, 0);
      else fill(0);

      rect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize, tileSize);
    }
  }
}



  // Player Controls //
function keyPressed() {
  // Toggle menu overlay
  if (keyCode === 32) { // SPACE
    showMenu = !showMenu;
  }

  // Player controls only when menu is not visible
  if (!showMenu) {
    if (keyCode === LEFT_ARROW)  player.move(-1, 0);
    if (keyCode === RIGHT_ARROW) player.move(1, 0);
    if (keyCode === UP_ARROW)    player.move(0, -1);
    if (keyCode === DOWN_ARROW)  player.move(0, 1);

    if (key === 'a' || key === 'A') player.move(-1, 0);
    if (key === 'd' || key === 'D') player.move(1, 0);
    if (key === 'w' || key === 'W') player.move(0, -1);
    if (key === 's' || key === 'S') player.move(0, 1);
  }
}


function drawMenuOverlay() {
  push();

  // Dim background
  fill(0, 180);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  noStroke();

  // ========== RESPONSIVE SIZES ==========
  let logoSize = width * 0.08;           // scales with window width
  logoSize = constrain(logoSize, 40, 120);

  let letterSpacing = logoSize * 0.75;
  let barWidth = width * 0.45;
  barWidth = constrain(barWidth, 250, 600);

  let barHeight = logoSize * 0.45;
  let centerY = height * 0.45;          // everything anchored here
  textSize(logoSize);

  // ========== LOGO LETTERS ==========
  let Gblue   = color(66, 133, 244);
  let Gred    = color(234, 67, 53);
  let Gyellow = color(251, 188, 5);
  let Ggreen  = color(52, 168, 83);

  let logoLetters = [
    ["S", Gblue], ["A", Gred], ["F", Gyellow], ["E", Gblue], ["T", Ggreen], ["Y", Gred],
    [" ", color(0,0,0,0)],
    ["S", Gblue], ["E", Gred], ["A", Gyellow], ["R", Gblue], ["C", Ggreen], ["H", Gred]
  ];

  let totalWidth = logoLetters.length * letterSpacing;
  let startX = width / 2 - totalWidth / 2;

  // ========== DRAW LOGO ==========
  for (let i = 0; i < logoLetters.length; i++) {
    let [letter, col] = logoLetters[i];
    fill(col);
    text(letter, startX + i * letterSpacing, centerY - logoSize);
  }

  // ========== SEARCH BAR ==========
  fill(255);
  stroke(200);
  strokeWeight(2);
  rect(width/2 - barWidth/2, centerY, barWidth, barHeight, barHeight / 2);

  // Placeholder text
  noStroke();
  fill(120);
  textSize(logoSize * 0.35);
  text("Search for a safe path...", width/2, centerY + barHeight * 0.1);

  // ========== START MESSAGE ==========
  textSize(logoSize * 0.25);
  fill(255);
  text("Press SPACE to Start / Resume", width/2, centerY + barHeight * 1.8);

  pop();
}


  // Game Creation //
function draw() {
  background(0);

  // Draw the maze and characters
  drawMaze();
  player.show();
  for (let enemy of enemies) {
    if (!showMenu) enemy.chase(player);  // pause enemies when menu is visible
    enemy.show();
  }

  // Check win/lose only if menu is not visible
  if (!showMenu) {
    if (maze[player.y][player.x] === 3) {
      showMenu = true;  // bring up menu when winning
      displayOverlayMessage("You Win!");
    }
    for (let enemy of enemies) {
      if (enemy.x === player.x && enemy.y === player.y) {
        showMenu = true;  // bring up menu when losing
        displayOverlayMessage("Game Over!");
      }
    }
  }

  // Draw menu overlay if visible
  if (showMenu) drawMenuOverlay();
}

  
   // -- Enemy and Player -- //
class Player {
constructor(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;   
  this.dy = 0; 
}
  // Player's model //
show() { 
  fill(255, 255, 0);
  ellipse(
    offsetX + this.x * tileSize + tileSize / 2,
    offsetY + this.y * tileSize + tileSize / 2,
    tileSize * 0.8
  );
}

 // Update position based on dx/dy
  update() {
    this.tryMove(this.dx, this.dy);
  }

  // Move manually
  move(dx, dy) {
    this.tryMove(dx, dy);
  }

  // Check if a tile is walkable
  canMoveTo(x, y) {
    return maze[y] && (maze[y][x] === 0 || maze[y][x] === 3);
  }

  // Handle movement and collisions
  tryMove(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    if (this.canMoveTo(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
}

class Enemy {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.moveCooldown = 0; // frames until next move
    this.lockOnDistance = 5; // distance at which enemy will start chasing
  }
 
   // Enemy Model //
show() {
  fill(255, 0, 0);
  rect(offsetX + this.x * tileSize, offsetY + this.y * tileSize, tileSize, tileSize);
}


  chase(player) {
    if (this.moveCooldown > 0) {
      this.moveCooldown--;
      return; 
    }

    this.moveCooldown = 20; // Move once every X frames

    // Calculate distance to player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);

    // Decide behavior based on distance
    if (distance <= this.lockOnDistance) {
      // If player is close, chase
      if (dx * dx > dy * dy) {
        if (dx > 0 && maze[this.y][this.x + 1] === 0) this.x++;
        else if (dx < 0 && maze[this.y][this.x - 1] === 0) this.x--;
        else if (dy > 0 && maze[this.y + 1][this.x] === 0) this.y++;
        else if (dy < 0 && maze[this.y - 1][this.x] === 0) this.y--;
      } else {
        if (dy > 0 && maze[this.y + 1][this.x] === 0) this.y++;
        else if (dy < 0 && maze[this.y - 1][this.x] === 0) this.y--;
        else if (dx > 0 && maze[this.y][this.x + 1] === 0) this.x++;
        else if (dx < 0 && maze[this.y][this.x - 1] === 0) this.x--;
      }
    } 

    // If player is far, move randomly
    else {
      let moves = [];
      if (maze[this.y][this.x + 1] === 0) moves.push([1, 0]);
      if (maze[this.y][this.x - 1] === 0) moves.push([-1, 0]);
      if (maze[this.y + 1] && maze[this.y + 1][this.x] === 0) moves.push([0, 1]);
      if (maze[this.y - 1] && maze[this.y - 1][this.x] === 0) moves.push([0, -1]);

      if (moves.length > 0) {
        let move = moves[floor(random(moves.length))];
        this.x += move[0];
        this.y += move[1];
      }
    }
  }
}


