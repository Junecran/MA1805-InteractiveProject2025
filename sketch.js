    // -- 'Safety Search' -- //

   // -- Data -- //
let player;
let enemies = [];
let showMenu = true;   // menu overlay is visible
let offsetX = 0;
let offsetY = 0;
let overlayMessage = "";
let showTemporaryMessage = false;
let messageTimer = 0;
let messageDelay = 20
let gameEnded = false;
let keys = {};


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
function isGameAtOrigin() {
  // Player start position
  if (player.x !== 10 || player.y !== 28) return false;

  // Enemy start positions
  let startEnemies = [
    [8, 1],
    [7, 9],
    [12, 5]
  ];

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x !== startEnemies[i][0] || enemies[i].y !== startEnemies[i][1]) {
      return false;
    }
  }

  // If all match, game is at origin
  return true;
}

function drawLetter(x, y, letter, c) {
  fill(c);
  text(letter, x, y);
}

function OverlayMessage(msg) {
  overlayMessage = msg;
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
  enemies.push(new Enemy(12, 5, true));
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
  keys[key] = true;

  if (keyCode === 32) { // SPACE toggles menu
    if (showMenu) gameEnded = false;
    showMenu = !showMenu;
  }
}
function keyReleased() {
  keys[key] = false;
}

function mousePressed() {
  if (showMenu) {
    let buttonWidth = width * 0.45 * 0.4;  // same as above
    let barWidth = width * 0.45;
    barWidth = constrain(barWidth, 250, 600);
    let barHeight = floor(width * 0.08 * 0.45);
    let centerY = height * 0.45;
    let buttonHeight = barHeight * 0.8;
    let buttonX = width/2 - buttonWidth/2;
    let buttonY = centerY + barHeight * 2.5;

    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
      resetGame();
    }
  }
}


function resetGame() {
  // Reset player
  player = new Player(10, 28);

  // Reset enemies
  enemies = [];
  enemies.push(new Enemy(8, 1));
  enemies.push(new Enemy(7, 9));
  enemies.push(new Enemy(12, 5, true));

  // Reset game state
  gameEnded = false;
  showMenu = true;
  showTemporaryMessage = false;
  overlayMessage = "";
}

  // Main Game Menu //
function gameMenu() {
  push();

// Menu Background
  fill(255);
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
  textSize(logoSize * 0.30);
  text("Search for a safe path", width/2, centerY + barHeight * 0.5);

  // ========== START MESSAGE ==========
  textSize(logoSize * 0.25);
  fill(255);
  text("Press SPACE to Start ", width/2, centerY + barHeight * 1.8);

let buttonWidth = barWidth * 0.4;
let buttonHeight = barHeight * 0.8;
let buttonX = width/2 - buttonWidth/2;
let buttonY = centerY + barHeight * 2.5;

// Change color based on game state
if (isGameAtOrigin()) {
  fill(200); // gray if already at origin
} else {
  fill(255, 100, 100); // red if game has changed
}

rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);

fill(255);
textSize(logoSize * 0.25);
text("Reset Game", width/2, buttonY + buttonHeight/2);

  pop();
  
}


  // Game Creation //

function draw() {
  background(0);

if (!showMenu) {
  player.update();
}

   if (showTemporaryMessage) {
    // Show the game screen but freeze enemies & player
    drawMaze();
    player.show();
    for (let enemy of enemies) enemy.show();

    // Draw the message
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text(overlayMessage, width / 2, height / 2);
    
pop();
    // Countdown
    messageTimer--;
    if (messageTimer <= 0) {
        showTemporaryMessage = false;
        showMenu = true;   // finally open the menu
    }

    return;    // stop the rest of draw()
}

  // Draw the maze and characters
  drawMaze();
  player.show();
  for (let enemy of enemies) {
    if (!showMenu) enemy.chase(player);  // pause enemies when menu is visible
    enemy.show();
  }


  // Check win/lose only if menu is not visible
if (!gameEnded && maze[player.y][player.x] === 3) {
  gameEnded = true;
  overlayMessage = "You Win!";
  showTemporaryMessage = true;
  messageTimer = messageDelay;
}

// LOSE (only run once)
for (let enemy of enemies) {
  if (!gameEnded && enemy.x === player.x && enemy.y === player.y) {
    gameEnded = true;
    overlayMessage = "Game Over!";
    showTemporaryMessage = true;
    messageTimer = messageDelay;
  }
}
  
 
  // Draw menu overlay if visible
  if (showMenu) gameMenu();
  
}

  
   // -- Enemy and Player -- //
class Player {
  
constructor(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.moveCooldown = 0;   // You forgot this!
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
  if (this.moveCooldown > 0) {
    this.moveCooldown--;
    return;
  }

  this.moveCooldown = 5;

  // Arrow keys
  if (keys['ArrowLeft'])  this.tryMove(-1, 0);
  if (keys['ArrowRight']) this.tryMove(1, 0);
  if (keys['ArrowUp'])    this.tryMove(0, -1);
  if (keys['ArrowDown'])  this.tryMove(0, 1);

  // WASD
  if (keys['a'] || keys['A']) this.tryMove(-1, 0);
  if (keys['d'] || keys['D']) this.tryMove(1, 0);
  if (keys['w'] || keys['W']) this.tryMove(0, -1);
  if (keys['s'] || keys['S']) this.tryMove(0, 1);
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
  constructor(x, y, alwaysChase = false) {
    this.x = x;
    this.y = y;
    this.alwaysChase = alwaysChase;
    
    // Faster if always chasing
    this.moveCooldownMax = this.alwaysChase ? 4 : 10; // lower = faster
    this.moveCooldown = 0;
    this.lockOnDistance = 5;
  }


  show() {
    fill(255, 0, 0);
    rect(offsetX + this.x * tileSize, offsetY + this.y * tileSize, tileSize, tileSize);
  }

chase(player) {
  if (this.moveCooldown > 0) {
    this.moveCooldown--;
    return;
  }

  this.moveCooldown = this.moveCooldownMax; // faster or normal

  // distance to player
  let dx = player.x - this.x;
  let dy = player.y - this.y;
  let distance = sqrt(dx * dx + dy * dy);

  if (this.alwaysChase || distance <= this.lockOnDistance) {
    // horizontal priority or vertical priority
    if (abs(dx) > abs(dy)) {
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
  } else {
    // random movement
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
