
// -- Global Data -- //  
let player;
let enemies = [];
let keys = {};
let tileSize, cols, rows;
let triggeredPopUp = false;
// Dynamic positioning
let offsetX = 0;
let offsetY = 0;
// Messages overlay
let overlayMessage = "";
let showTemporaryMessage = false;
// Menus and assets data
let mainMenuImg;
let infoMenuImg;
let popUpImg;
let guidesImg;
let robotoFont;
let showMainMenu = true;
let showPopUp = false;
let showInfoMenu = false;
let restButtonPos = {
 rW: 0.15, 
 rH: 0.058, 
 rX: 0.35,
 rY: 0.713
};
let infoMenuPos = {
 imW: 0.7,
 imH: 0.06,
 imX: 0.15,
 imY: 0.625
};
let backButtonPos = {
 bW: 0.25,
 bH: 0.06,
 bX: -0.06,
 bY: 0.18
};

// Maze Map //
let maze = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,1,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
[1,0,1,0,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],
[1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
[1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
[1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
[1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1],
[1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,2,1,0,1,0,1,1,1,1,1],
[1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,2,1,0,1,1,1,0,1],
[1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,2,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,2,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1],
[1,0,1,1,1,0,1,0,1,0,1,0,1,2,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
[1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
[1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1,1,1,2,1,0,1,0,1,0,0,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
[1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1],
[1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,2,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,2,0,0,1,0,1,0,1,2,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[3,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
[3,0,1,0,1,0,1,0,1,0,0,0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1],
[1,1,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1],
[1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,1,1],
[1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,2,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1],
[1,0,1,0,1,0,1,0,2,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,0,0,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1],
[1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,2,0,0,1,0,1,0,1],
[1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,1,0,1,0,0,2,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,0,0,1,0,1,2,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,2,1,0,1,0,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,2,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,2,0,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,2,0,0,1,2,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
[1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
[1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];


// Preload //  
function preload() {
  mainMenuImg = loadImage("assets/SafetySearchMenu.png");
  infoMenuImg = loadImage("assets/SSMHowToPlay.png"); 
  popUpImg = loadImage("assets/SSMPopUp.png"); 
  guidesImg = loadImage("assets/SSMGuides.png");
  robotoFont = loadFont("assets/RobotoMedium.ttf");
}


// -- Setup & Menus Positions -- //
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Main Menu Image Settings //
  mainMenu = {
   img: mainMenuImg,
   width: 1100, // Size 
   height: 600,
   x: (width - 1100) / 2, // Placement
   y: (height - 700) / 4
   };

  // Information Menu Settings //
  infoMenu = {
   img: infoMenuImg,
   width: 900 , // Size 
   height: 700,
   x: (width - 900) / 2, // Placement
   y: (height - 700) / 4
   };

// Pop Up Settings //
  popUp = {
   img: popUpImg,
   width: 900 , // Size 
   height: 700,
   x: (width - 900) / 2, // Placement
   y: (height - 700) / 4
  };

   // Guides Settings //
  guides = {
   img: guidesImg,
   width: 900, // Size
   height: 700,
   x: (width - 900) / 2, // Placement
   y: (height - 700) / 2 + 100 
  };


  cols = maze[0].length;
  rows = maze.length;
  tileSize = floor(min(width / cols, height / rows));

  updateOffsets(); // Dynamic resizing 
  resetGame();
}

// Resizing Window //
function updateOffsets() {
  offsetX = (windowWidth - cols * tileSize) / 2;
  offsetY = (windowHeight - rows * tileSize) / 2;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSize = floor(min(width / cols, height / rows));
  updateOffsets();
}
// Temporary Message Function //
function showMessage(text, duration = 1500) {
  overlayMessage = text;
  showTemporaryMessage = true;

  setTimeout(() => {
    showTemporaryMessage = false;
    showMainMenu = true;
  }, duration);
}


// ---  Menu Buttons --- //

// -- Appearance -- //
// Reset Button //
function drawResetButton() {
  let w = mainMenu.width * restButtonPos.rW;
  let h = mainMenu.height * restButtonPos.rH;
  let x = mainMenu.x + mainMenu.width * restButtonPos.rX;
  let y = mainMenu.y + mainMenu.height * restButtonPos.rY;
  // Conditional Appearance 
  fill(gameStartEvent() ? 250 : [255, 120, 120]); // Main Colour
  noStroke();
  rect(x + 10, y, w- 20, h, 10);
  // Highlight Mouse Target
  let hovering = 
  mouseX >= x && mouseX <= x + w &&
  mouseY >= y && mouseY <= y + h;

   if (hovering) {
    fill(0, 0, 0, 100); // Highlight colour
    noStroke();
    rect(x + 10, y, w- 20, h, 10);
  }
  // Text
  fill(70);
  textAlign(CENTER, CENTER);
  textSize(h * 0.47);
  textFont(robotoFont);
  text("Game Reset", x + w / 2, y + h / 2.2);
}

// Information Menu Button //
function drawInfoMenu() {
  let w = mainMenu.width * infoMenuPos.imW;
  let h = mainMenu.height * infoMenuPos.imH;
  let x = mainMenu.x + mainMenu.width * infoMenuPos.imX;
  let y = mainMenu.y + mainMenu.height * infoMenuPos.imY;
  // Highlight Mouse Target
  let hovering =
   mouseX >= x && mouseX <= x + w &&
   mouseY >= y && mouseY <= y + h;

  if (hovering) {
    fill(0, 0, 0, 100); // Highlight colour
    noStroke();
    rect(x + 19, y, w - 35, h);
  }
  // Text
  fill(70);
  textAlign(CENTER, CENTER);
  textSize(h * 0.5);
  textFont(robotoFont);
  text("How to Play?", x + w / 6, y + h / 2.2);
}

// Back to Menu Button  //
function drawBackButton() {
  let w = infoMenu.width * backButtonPos.bW;
  let h = infoMenu.height * backButtonPos.bH;
  let x = infoMenu.x + infoMenu.width * backButtonPos.bX;
  let y = infoMenu.y + infoMenu.height * backButtonPos.bY;
  // Highlight Mouse Target
  let hovering = 
   mouseX >= x && mouseX <= x + w &&
   mouseY >= y && mouseY <= y + h;

  if (hovering) {
   fill(0, 0, 0, hovering ? 100 : 0); // Highlight colour
   noStroke();
   rect(x + 30, y-3, w - 60, h);
  }
  // Text 
  fill(70);
  textAlign(CENTER, CENTER);
  textSize(h * 0.35);
  textFont(robotoFont);
  text("Back to Main Menu", x + w / 2, y + h / 2.2);
}


//  -- Button Inputs --  //
function mousePressed() {
  if (showMainMenu && !showInfoMenu) {
  // Reset Button 'Game Reset'//
    let w1 = mainMenu.width * restButtonPos.rW; 
    let h1 = mainMenu.height * restButtonPos.rH;
    let x1 = mainMenu.x + mainMenu.width  * restButtonPos.rX;
    let y1 = mainMenu.y + mainMenu.height * restButtonPos.rY;

    if (mouseX >= x1 && mouseX <= x1 + w1 &&
      mouseY >= y1 && mouseY <= y1 + h1) {
      resetGame();
      return;
    }
 
  // Information Menu Button 'How To Play?'//
    let w2 = mainMenu.width * infoMenuPos.imW;
    let h2 = mainMenu.height * infoMenuPos.imH;
    let x2 = mainMenu.x + mainMenu.width * infoMenuPos.imX;
    let y2 = mainMenu.y + mainMenu.height * infoMenuPos.imY;

    if (mouseX >= x2 && mouseX <= x2 + w2 &&
      mouseY >= y2 && mouseY <= y2 + h2) {
      showInfoMenu = true;
      return;
    }
  }

  // Back to Main Menu Button //
  if (showInfoMenu) {
    let w3 = infoMenu.width * backButtonPos.bW;
    let h3 = infoMenu.height * backButtonPos.bH;
    let x3 = infoMenu.x + infoMenu.width  * backButtonPos.bX;
    let y3 = infoMenu.y + infoMenu.height * backButtonPos.bY;

    if (mouseX >= x3 && mouseX <= x3 + w3 &&
     mouseY >= y3 && mouseY <= y3 + h3) {
     showInfoMenu = false;
     return;
    }
  }

  // Close Pop Up //
  if (showPopUp) {
   let w4 = popUp.width * 0.8;
   let h4 = popUp.height * 0.8;
   let x4 = width / 2;
   let y4 = height / 2;
 
  if (mouseX >= x4 - w4 / 2 && mouseX <= x4 + w4 / 2 &&
    mouseY >= y4 - h4 / 2 && mouseY <= y4 + h4 / 2) {
    showPopUp = false;
    return;
  }
}
}

// -- Reset Game Function -- //
function resetGame() {
  player = new Player(39, 41); // Player spawn point
  enemies = [
    new Enemy(9, 9), // Enemies spawn point  // Add more enemies here if wanted
    new Enemy(75, 75), 
    new Enemy(9, 75),
    new Enemy(75, 9),
    new Enemy(60, 30),
    new Enemy(30, 60),
    new Enemy(37, 20),
    new Enemy(50, 60),
    new Enemy(20, 40),
    new Enemy(46, 24, true),
    new Enemy(40, 55, true)
  ];
  gameEndEvent= false;
  showMainMenu = true;
  showTemporaryMessage = false;
  overlayMessage = "";
}
// -- Game Initial State -- //
// For the reset function
function gameStartEvent() {
  // Add the new enemies below [X,Y] otherwise it breaks 
  let startEnemies = [[9,9],[75,75],[9,75],[75,9],[60, 30],[30, 60],[37, 20],[50, 60],[20, 40],[46, 24],[40, 55]];

  if (player.x !== 39 || player.y !== 41) return false;
  for (let i=0;i<enemies.length;i++) {
    if (enemies[i].x !== startEnemies[i][0] || enemies[i].y !== startEnemies[i][1]) return false;
  }
  return true;
}



// -- Game Logic -- // 
function draw() {
  background(233, 236, 240);

 // Temporary Win/Lose Message  //
  if (showTemporaryMessage) {
   drawMaze();
   player.show();
   enemies.forEach(e => e.show());
  // Message Appearances
   push();
   background(225, 200);
   fill(0);
   textAlign(CENTER, CENTER);
   textSize(50);
   textFont(robotoFont);
   text(overlayMessage, width / 2, height / 2);
   pop();
   return; 
  }

  // Gameplay Update //
  if (!showMainMenu) player.update();
   drawMaze();
   player.show();
   enemies.forEach(e => {
   if (!showMainMenu) e.chase(player);
    e.show();
  });
  // Win Condition
  if (!gameEndEvent && maze[player.y][player.x] === 3) {
   gameEndEvent = true;
   triggeredPopUp = false;
   showMessage("You Win!", 1500);
   setTimeout(resetGame, 1500);
  }
  // Lose Condition
  enemies.forEach(e => {
  if (!gameEndEvent && e.x === player.x && e.y === player.y) {
    gameEndEvent = true;
    triggeredPopUp = false;
    showMessage("Game Over!", 1500);
    setTimeout(resetGame, 1500);
  }
  });

  // Menus //
 if (showMainMenu) {
  background(255);
if (showInfoMenu) {
  // Information Menu (highest priority)
  background(255);
  image(infoMenu.img, infoMenu.x, infoMenu.y, infoMenu.width, infoMenu.height);
  image(guides.img, guides.x, guides.y, guides.width * 0.8, guides.height * 0.8);
  drawBackButton();
  // Main Menu
  } else if (showMainMenu) {
   background(255);
   image(mainMenu.img, mainMenu.x, mainMenu.y, mainMenu.width, mainMenu.height);
   drawResetButton();
   drawInfoMenu();
  } 
 // Pop Up Logic //
  if (!showMainMenu && !showPopUp && !triggeredPopUp && maze[player.y][player.x] === 2) {
    showPopUp = true;
    triggeredPopUp = true; }
  if (maze[player.y][player.x] !== 2) {
    triggeredPopUp = false; }
  if (showPopUp && !showMainMenu) {
    push();
    imageMode(CENTER);
    image(popUp.img, width / 2, height / 2, popUp.width * 0.8, popUp.height * 0.8);
    pop();
  }
 }
}


//  -- Maze Appearance -- //
function drawMaze() {
  noStroke(); // Remove outlines

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      if (maze[y][x] === 1) fill(89, 90, 92); // Walls tile colour
       else if (maze[y][x] === 2) fill(220, 220, 220); // Trap tile colour
       else if (maze[y][x] === 3) fill(0, 255, 0); // Win tile colour
       else fill(233, 236, 240); // Path/empty tile colour

      rect(
        offsetX + x * tileSize - 0.5,
        offsetY + y * tileSize - 0.5,
        tileSize + 1,
        tileSize + 1
      );
    }
  }
}



// -- Game Controls -- //
// Menus Toggle //
function keyPressed() {
  keys[key] = true;
  if (keyCode === 13) { // 'ENTER' Key Code to control the Menus
    if (showMainMenu) {
      showMainMenu = false;
      gameEndEvent= false;
    } else {
      showMainMenu = true;
      showPopUp = false;        
      triggeredPopUp = false;
    }
  }
}
// Key Function //
function keyReleased() { keys[key] = false; 
}
 


// --- Game Characters Data --- //

// -- Player -- //
class Player {
   constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveCooldown = 0;
  }
 // Player's Appearance //
  show() {
    fill(43, 89, 223); // Colour
    ellipse(offsetX + this.x * tileSize + tileSize / 2,
            offsetY + this.y * tileSize + tileSize / 2,
            tileSize * 0.8);
  }

 // Movement Settings //
  update() {
    if (this.moveCooldown > 0){ this.moveCooldown--; return; }
    this.moveCooldown = 8; // Movement speed
// Player Controls
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {this.collison(-1, 0);}
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {this.collison(1, 0);}
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {this.collison(0, -1);}
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {this.collison(0, 1);}
  }
// Maze Wall Collision 
  collison(dx,dy){
    let nx = this.x + dx;
    let ny = this.y + dy;

    if (maze[ny] && (maze[ny][nx] === 0 || maze[ny][nx] === 2 || maze[ny][nx] === 3)) {
      this.x = nx;
      this.y = ny;
    }
  }
}

// -- Enemy -- // 
class Enemy {
  constructor(x, y, alwaysChase = false, path = null) {
    this.x = x;
    this.y = y;
    this.alwaysChase = alwaysChase;
    // Chasers move more often
    this.moveCooldownMax = alwaysChase ? 8 : 10;
    this.moveCooldown = 5;
    // Patrol path
    this.path = path;  // Array of positions, e.g. [[3,2], [5,2], [5,4]]
    this.pathIndex = 0;
    this.pathForward = true; // Whether the patrol is moving forward
  }

  // Enemy Appearances //
  show() {
    if (this.alwaysChase) {
      // Chasing enemy (hacker) colour
      fill(229, 54, 44, 240);
    } else {
      // Patrolling enemy (virus) colour
      fill(240, 179, 41, 240);
    }

    ellipse(
      offsetX + this.x * tileSize + tileSize / 2,
      offsetY + this.y * tileSize + tileSize / 2,
      tileSize * 0.8,
      tileSize * 0.8
    );
  }

  //  Movement Behaviour  //
  chase(player) {
    if (this.moveCooldown > 0) {
      this.moveCooldown--;
      return;
    }
    this.moveCooldown = this.moveCooldownMax;

    // Hacker always follow the player
    if (this.alwaysChase) {
      this.moveTowards(player.x, player.y);
      return;
    }
    // virus patrols the paths
    if (this.path) {
      this.followPath();
      return;
    }
    // Random movement
    this.randomMove();
  }

  // Patrol Movement //
  followPath() {
    let target = this.path[this.pathIndex];

    // If reached the current path step
    if (this.x === target[0] && this.y === target[1]) {

      // Move forward or backward depending on direction
      this.pathIndex += this.pathForward ? 1 : -1;

      // If goes too far right, switch to backward mode
      if (this.pathIndex >= this.path.length) {
        this.pathIndex = this.path.length - 2;
        this.pathForward = false;
      }
      // If goes too far left, switch to forward mode
      if (this.pathIndex < 0) {
        this.pathIndex = 1;
        this.pathForward = true;
      }
      target = this.path[this.pathIndex];
    }
    this.moveTowards(target[0], target[1]);
  }

  // Chasing Movement //
  moveTowards(targetX, targetY) {
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let moved = false;

    // Move in the stronger direction first 
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && maze[this.y][this.x + 1] === 0) {
        this.x++;
        moved = true;
      } else if (dx < 0 && maze[this.y][this.x - 1] === 0) {
        this.x--;
        moved = true;
      }
    }

    // If didn't move, try other
    if (!moved) {
      if (dy > 0 && maze[this.y + 1][this.x] === 0) {
        this.y++;
      } else if (dy < 0 && maze[this.y - 1][this.x] === 0) {
        this.y--;
      }
    }
  }

  // Random Movement //
  randomMove() {
    let options = [];

    if (maze[this.y][this.x + 1] === 0) options.push([1, 0]);
    if (maze[this.y][this.x - 1] === 0) options.push([-1, 0]);
    if (maze[this.y + 1] && maze[this.y + 1][this.x] === 0) options.push([0, 1]);
    if (maze[this.y - 1] && maze[this.y - 1][this.x] === 0) options.push([0, -1]);

    if (options.length > 0) {
      let move = random(options);
      this.x += move[0];
      this.y += move[1];
    }
  }
}
