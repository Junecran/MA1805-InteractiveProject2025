**Eleanor Craner** - [GitHub Link](https://github.com/Junecran/MA1805-InteractiveProject2025) - [Website Link](https://junecran.github.io/MA1805-InteractiveProject2025/)


# [Safety Search Game](SafetySearchGame/index.html) - ###Link to Game
This maze game, inspired by Pac-Man, highlights the risks of navigating the internet. The enemies, modelled after Pac-Man's pursuers, represent hackers and scammers who exploit users, from nuisance calls to large-scale financial scams. Viruses are depicted as less aggressive enemies that move randomly, reflecting the threat of malicious links and compromised websites.

As the internet becomes more integrated into daily life, educating users about online risks is essential. While this game does not address every issue, it offers an engaging introduction to online safety.

**Design Choices**

- I designed the game with a modern, clean aesthetic to reinforce its connection to the online world. The user interface, colour palette, and fonts draw inspiration from contemporary search engines such as Google. The maze style is primarily influenced by the 'dinosaur no wifi game.'

- While the 'Dinosaur game' uses mainly shades of grey, I incorporated bolder colours to help players distinguish between different characters and features.

- I kept the player and enemy models simple due to the maze's size and complexity, so as not to distract from the goal. 

- The maze’s size was to increase the game's difficulty and provide space for features like the ‘Trap’ tiles.

## Debrief
Time constraints limited the scope of this project, so I prioritised establishing the core concepts to clarify the game's direction. For example, while elements such as the ‘Pop Ups’ in the maze are not fully stylised, they still contribute value to the overall experience.

- Randomly generating the maze could have improved the game's replayability. However, I view this as a positive outcome: once players learn the optimal solution, the game can symbolise how people become more adept at avoiding online dangers through experience.

- Creating the maze was a nightmare as it was hard to see the briary code as walls and paths. After the first couple of maze drafts, I made a ‘Maze Maker Tool’ heavily inspired by code from digital pixel painting apps. (More of the ‘Maze Maker Code’ below)

- Player movement posed a significant challenge, as the initial methods resulted in choppy motion. I found it undesirable to repeatedly press keys, so I implemented a 'holding the button down' approach. However, this adjustment made navigation through the maze's openings feel awkward. I intend to improve this aspect in future iterations.

- The enemy AI initially performed poorly and will get stuck on walls. After extensive trial and error, I developed a functional AI, though it does not provide an engaging challenge for players. To address this, I increased the enemy's speed, but i wish to explore AI's pathfinding in the future.

- In my efforts to code more efficiently, I tried to consolidate variables and functions where possible. Despite this, I still feel the codebase has too many variables. Also, avoiding more accessible variables has made adjusting placements complicated.

- Finally, I wish I had more time to develop the game's features. I intended the 'pop-ups' to appear more intrusive and randomised. I also wanted to experiment with the user interface style and create a more visually appealing maze and gameplay using modern UI menus, possibly combined with arcade game styles.

**There are solution and trap locations Images in the 'SafetySearchGame/assets' if needed**

# [Maze Maker Tool](MazeMakerCode/index.html) - Link to Extra Code

**Quick Description**

This code provides a fast and interactive way to create custom mazes by turning a simple grid into an editable map. By representing the maze as a 2D array where each cell is either a wall (1) or a path (0), the program allows users to visually design maze layouts rather than manually edit long arrays of numbers. 

Each cell is drawn as a square: black for walls and white for open spaces. This visual feedback lets users instantly see how their maze looks and make adjustments on the fly.

The interactivity comes from the mousePressed() function. Clicking on any cell toggles it between wall and path, allowing rapid building or editing without typing. The code also includes a save feature: pressing S exports the maze as a text file, with each row converted to comma-separated values. This makes it easy to transfer the maze to other programs or reuse it later. Overall, the system was very helpful for quick maze creation.


## References and Study Note
- The 'Dino Game' i referenced in the README - https://trex-runner.com

**Enemy Path Following**
Forward → Reverse → Forward → Reverse … stops Go forward through the array → when you reach the end, instantly teleport back to the start.
- The 'PingPong' Math for smooth pathing https://docs.unity3d.com/ScriptReference/Mathf.PingPong.html
- Ai Pathfinding https://theory.stanford.edu/~amitp/GameProgramming/

**Enemy Chasing Logic**
Move toward the strongest direction first (horizontal vs vertical). Creates the classic "chase" behavior — simple but effective.
-https://gameinternals.com/understanding-pac-man-ghost-behavior

if (Math.abs(dx) > Math.abs(dy)) {
  // Try horizontal movement first
}

**SetTimeout** No notes needed pretty simple to use but very glad i used it.

**Game Reset System**
checks whether: the player is at the original spawn /the enemy list matches the original spawn list
If all match → the game is at its pure restart state.
-https://gameprogrammingpatterns.com/state.html

let startEnemies = [[9,9],[75,75],[9,75],[75,9],[60,30],[30,60],[37,20],[50,60],[20,40],[46,24],[40,55]];

if (player.x !== 39 || player.y !== 41) return false;

for (let i=0; i<enemies.length; i++) {
  if (enemies[i].x !== startEnemies[i][0] ||
      enemies[i].y !== startEnemies[i][1]) 
    return false;
}
return true;

### Maze Maker Tool References
- Savestrings -  https://p5js.org/reference/p5/saveStrings
- Drawing/ grid - https://gist.github.com/johnfredcee/81b09011a88c99b84e3a5f870ae46d5a
- Mouse controls - https://p5js.org/reference/p5/mousePressed



