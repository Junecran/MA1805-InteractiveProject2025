# Safety Search Game
This maze game, inspired by Pac-Man, highlights the risks of navigating the internet. The enemies, modelled after Pac-Man's pursuers, represent hackers and scammers who exploit users, from nuisance calls to large-scale financial scams. Viruses are depicted as less aggressive enemies that move randomly, reflecting the threat of malicious links and compromised websites.

As the internet becomes more integrated into daily life, educating users about online risks is essential. While this game does not address every issue, it offers an engaging introduction to online safety.

**Design Choices**

- I designed the game with a modern, clean aesthetic to reinforce its connection to the online world. The user interface, colour palette, and fonts draw inspiration from contemporary search engines such as Google. The maze style is primarily influenced by the 'dinosaur no wifi game.'

- While the Dinosaur game uses mainly shades of grey, I incorporated bolder colours to help players distinguish between different characters and features.

- I kept the player and enemy models simple due to the maze's size and complexity, so as not to distract from the goal. 

- The maze’s size was to increase the game's difficulty and provide space for features like the ‘Trap’ tiles.

## Debrief
Time constraints limited the scope of this project, so I prioritised establishing the core concepts to clarify the game's direction. For example, while elements such as the ‘Pop Ups’ in the maze are not fully stylised, they still contribute value to the overall experience.

- Randomly generating the maze could have improved the game's replayability. However, I view this as a positive outcome: once players learn the optimal solution, the game can symbolise how people become more adept at avoiding online dangers through experience.

- Creating the maze was a nightmare as it was hard to see the briary code as walls and paths. After the first couple of maze drafts, I made a ‘Maze Maker code’ heavily inspired by code from digital pixel painting apps. (More of the ‘Maze Maker Code’ below)

- Player movement posed a significant challenge, as the initial methods resulted in choppy motion. I found it undesirable to repeatedly press keys, so I implemented a 'holding the button down' approach. However, this adjustment made navigation through the maze's openings feel awkward. I intend to improve this aspect in future iterations.

- The enemy AI initially performed poorly. After extensive trial and error, I developed a functional AI, though it does not provide an engaging challenge for players. To address this, I increased the enemy's speed, but I aim to enhance the AI's pathfinding in the future.

- In my efforts to code more efficiently, I tried to consolidate variables and functions where possible. Despite this, I still feel the codebase has too many variables. Also, avoiding more accessible variables has made adjusting placements complicated.

- Finally, I wish I had more time to develop the game's features. I intended the 'pop-ups' to appear more intrusive and randomised. I also wanted to experiment with the user interface style and create a more visually appealing maze and gameplay using modern UI menus, possibly combined with arcade game styles.




# Maze Maker - Extra Code





   

## Study Notes 

- class
- maybe else
- the coollision check 
- THis
-  constructor instead of let in classes
### Info

## Maze Maker Code

**Description**

## Debrief

## References Used
- Savestrings -  https://p5js.org/reference/p5/saveStrings
- Drawing/ grid - https://gist.github.com/johnfredcee/81b09011a88c99b84e3a5f870ae46d5a
- Mouse controls - https://p5js.org/reference/p5/mousePressed



   Solve the maze to reach the green tile to win. However, beware of viruses and hackers that will hunt you down; touching them will cause a game over. Trap tiles will randomly appear to slow your progress. 

## Study Notes 
