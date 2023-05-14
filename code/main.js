import kaboom from "kaboom"

// initialize context
kaboom({
  font : "sink",
  background : [210,210,155] 
})

// Lets load the sprites
loadSprite("programmer", "sprites/programmer.png");
loadSprite("coffee", "sprites/coffee.png");
loadSprite("bug", "sprites/bug.png");

// Lets load the Music
loadSound("gameEnd", "sounds/gameEnd.mp3");
loadSound("coffeeSip", "sounds/coffeeSip.mp3");
loadSound("background", "sounds/background.mp3");

// Lets define some game variables
let SPEED = 620
let BSPEED = 2
let SCORE = 0;
let scoreText;
let bg = false;
let backgroundMusic;

// lets play background music
const playBg = () => {
  if(!bg){
    backgroundMusic = play("background", {
      volume : 0.7
    }) 
    bg = true;
  }
}


// Lets define a function to display our score
  const displayScore = () => {
    destroy(scoreText)
     scoreText = add([
        text("Score: " + SCORE),
       scale(3),
        pos(width() - 181, 21),
        
])
    
  }

// Lets add the player
const player = add([
    sprite("programmer"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    scale(0.13)
])
// Lets add events to our player
onKeyDown("left", () => {
    playBg()
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
    playBg()
    player.move(SPEED, 0)
})

onKeyDown("up", () => {
  playBg()
    player.move(0, -SPEED)
})

onKeyDown("down", () => {
  playBg()
    player.move(0, SPEED)
})


// Lets add the 4 bugs and A coffee on loop
setInterval(() => {

  for(let i=0 ; i < 4 ; i++){
    let x = rand(0, width());
    let y = height();

    let bug = add([
      sprite("bug"),  
      pos(x, y),    
      area(),          
      scale(0.13),
      "bug"
    ])
    bug.onUpdate(() => {
      bug.moveTo(bug.pos.x, bug.pos.y - BSPEED)
    }) 
  }
  
    let x = rand(0, width());
    let y = height();
    // Lets introduce the coffee 
    let coffee = add([
      sprite("coffee"),  
      pos(x, y),    
      area(),          
      scale(0.13),
      "coffee"
    ])
    coffee.onUpdate(() => {
      coffee.moveTo(coffee.pos.x, coffee.pos.y - BSPEED)
    })

  if(BSPEED < 10){
    BSPEED += 1  
  }
  
}, 4000)


 player.onCollide("bug", () => {
   backgroundMusic.volume(0.2)
    play("gameEnd")
   destroy(player)
   addKaboom(player.pos)

   scoreText = add([
        text("Game Over "),
        scale(3),
        pos(10, 21),
        color(0, 0, 255)
        
  ])
})


 player.onCollide("coffee", (coffee) => {
   backgroundMusic.volume(0.1)
    play("coffeeSip", {
      volume : 1
    })
    destroy(coffee)
    SCORE += 1
   displayScore()
   // 2 seconds until explosion! Runnn!
    wait(2, () => {
        backgroundMusic.volume(1)
    })

   
})

// Display the score
displayScore()

