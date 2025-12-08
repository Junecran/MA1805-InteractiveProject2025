let player;
let enemies = [];
let showMenu = true;
let offsetX = 0;
let offsetY = 0;
let overlayMessage = "";
let showTemporaryMessage = false;
let messageTimer = 0;
let messageDelay = 20;
let gameEnded = false;
let keys = {};
let menuImg;

function preload() {
  menuImg = loadImage("assets/SafetySearchMenu.png");
}

// Maze
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

let tileSize, cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  cols = maze[0].length;
  rows = maze.length;
  tileSize = floor(min(width / cols, height / rows));
  updateOffsets();

  resetGame();
}

function updateOffsets() {
  offsetX = (width - cols * tileSize) / 2;
  offsetY = (height - rows * tileSize) / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSize = floor(min(width / cols, height / rows));
  updateOffsets();
}

// ----------------- GAME LOOP -----------------
function draw() {
  background(0);

  if (!showMenu) player.update();

  if (showTemporaryMessage) {
    drawMaze();
    player.show();
    enemies.forEach(e => e.show());

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text(overlayMessage, width / 2, height / 2);
    pop();

    messageTimer--;
    if (messageTimer <= 0) {
      showTemporaryMessage = false;
      showMenu = true;
    }
    return;
  }

  drawMaze();
  player.show();
  enemies.forEach(e => {
    if (!showMenu) e.chase(player);
    e.show();
  });

  // Win condition
  if (!gameEnded && maze[player.y][player.x] === 3) {
    gameEnded = true;
    overlayMessage = "You Win!";
    showTemporaryMessage = true;
    messageTimer = messageDelay;
  }

  // Lose condition
  enemies.forEach(e => {
    if (!gameEnded && e.x === player.x && e.y === player.y) {
      gameEnded = true;
      overlayMessage = "Game Over!";
      showTemporaryMessage = true;
      messageTimer = messageDelay;
    }
  });

  if (showMenu) gameMenu();
}

// ----------------- MAZE -----------------
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

// ----------------- MENU -----------------
function gameMenu() {
  background(255); // optional, in case your image doesn't cover full area

  // Calculate scale to fit image inside canvas
  let scaleX = width / menuImg.width;
  let scaleY = height / menuImg.height;
  let scale = min(scaleX, scaleY);

  let imgW = menuImg.width * scale;
  let imgH = menuImg.height * scale;

  let imgX = (width - imgW) / 2;
  let imgY = (height - imgH) / 2;

  image(menuImg, imgX, imgY, imgW, imgH);

  drawResetButton();
}
function drawResetButton() {
  let w = width * 0.18;
  let h = height * 0.05;
  let x = width / 2 - w / 2;
  let y = height * 0.7;

  fill(isGameAtOrigin() ? 180 : [255, 120, 120]);
  noStroke();
  rect(x, y, w, h, 10);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(h * 0.5);
  text("RESET", x + w / 2, y + h / 2);
}

function mousePressed() {
  if (showMenu) {
    let w = width * 0.18;
    let h = height * 0.05;
    let x = width / 2 - w / 2;
    let y = height * 0.7;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) resetGame();
  }
}

// ----------------- INPUT -----------------
function keyPressed() {
  keys[key] = true;

  if (keyCode === 32) { // SPACE
    // SPACE toggles menu but only if the game is not over
    if (!gameEnded) showMenu = !showMenu;
  }

  if (keyCode === 13) { // ENTER
    if (showMenu) {
      // Start game from menu
      showMenu = false;
      gameEnded = false;
    } else {
      // Reopen menu while playing
      showMenu = true;
    }
  }
}
function keyReleased() { keys[key] = false; }

// ----------------- RESET -----------------
function resetGame() {
  player = new Player(10, 28);
  enemies = [
    new Enemy(8, 1),
    new Enemy(7, 9),
    new Enemy(12, 5, true)
  ];
  gameEnded = false;
  showMenu = true;
  showTemporaryMessage = false;
  overlayMessage = "";
}

// ----------------- GAME LOGIC -----------------
function isGameAtOrigin() {
  if (player.x !== 10 || player.y !== 28) return false;
  let startEnemies = [[8,1],[7,9],[12,5]];
  for (let i=0;i<enemies.length;i++) {
    if (enemies[i].x !== startEnemies[i][0] || enemies[i].y !== startEnemies[i][1]) return false;
  }
  return true;
}

// ----------------- PLAYER -----------------
class Player {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.moveCooldown = 0;
  }

  show() {
    fill(255, 255, 0);
    ellipse(offsetX + this.x*tileSize + tileSize/2,
            offsetY + this.y*tileSize + tileSize/2,
            tileSize*0.8);
  }

  update() {
    if (this.moveCooldown>0){ this.moveCooldown--; return; }
    this.moveCooldown=5;

    if (keys['ArrowLeft']||keys['a']||keys['A']) this.tryMove(-1,0);
    if (keys['ArrowRight']||keys['d']||keys['D']) this.tryMove(1,0);
    if (keys['ArrowUp']||keys['w']||keys['W']) this.tryMove(0,-1);
    if (keys['ArrowDown']||keys['s']||keys['S']) this.tryMove(0,1);
  }

  tryMove(dx,dy){
    let nx = this.x+dx, ny=this.y+dy;
    if (maze[ny] && (maze[ny][nx]===0||maze[ny][nx]===3)){
      this.x=nx; this.y=ny;
    }
  }
}

// ----------------- ENEMY -----------------
class Enemy {
  constructor(x, y, alwaysChase=false){
    this.x=x; this.y=y; this.alwaysChase=alwaysChase;
    this.moveCooldownMax = alwaysChase ? 4 : 10;
    this.moveCooldown = 0;
    this.lockOnDistance = 5;
  }

  show() {
    fill(255,0,0);
    rect(offsetX+this.x*tileSize, offsetY+this.y*tileSize, tileSize, tileSize);
  }

  chase(player){
    if (this.moveCooldown>0){ this.moveCooldown--; return; }
    this.moveCooldown=this.moveCooldownMax;

    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distance = sqrt(dx*dx + dy*dy);

    if (this.alwaysChase || distance<=this.lockOnDistance) {
      let moved=false;
      if (abs(dx)>abs(dy)) {
        if (dx>0 && maze[this.y][this.x+1]===0){ this.x++; moved=true; }
        else if (dx<0 && maze[this.y][this.x-1]===0){ this.x--; moved=true; }
        if (!moved){
          if (dy>0 && maze[this.y+1] && maze[this.y+1][this.x]===0) this.y++;
          else if (dy<0 && maze[this.y-1] && maze[this.y-1][this.x]===0) this.y--;
        }
      } else {
        if (dy>0 && maze[this.y+1] && maze[this.y+1][this.x]===0){ this.y++; moved=true; }
        else if (dy<0 && maze[this.y-1] && maze[this.y-1][this.x]===0){ this.y--; moved=true; }
        if (!moved){
          if (dx>0 && maze[this.y][this.x+1]===0) this.x++;
          else if (dx<0 && maze[this.y][this.x-1]===0) this.x--;
        }
      }
    } else {
      let moves=[];
      if (maze[this.y][this.x+1]===0) moves.push([1,0]);
      if (maze[this.y][this.x-1]===0) moves.push([-1,0]);
      if (maze[this.y+1] && maze[this.y+1][this.x]===0) moves.push([0,1]);
      if (maze[this.y-1] && maze[this.y-1][this.x]===0) moves.push([0,-1]);
      if (moves.length>0){
        let m = moves[floor(random(moves.length))];
        this.x+=m[0]; this.y+=m[1];
      }
    }
  }
}
