/* VARIABLES */
let ball, board, startButton;
let restart;
let score = 0;
let screen = 0;


/* PRELOAD LOADS FILES */
function preload(){
  
}

/* SETUP RUNS ONCE */
function setup(){
  createCanvas(500, 400);
  textAlign(CENTER);
  textSize(20);
  noStroke();

  //create button
   startButton = new Sprite(width/2, height/2 + 80);
   restart = new Sprite(-200,-200);

  board = new Sprite(-200,-380,100,20, "k");
  board.color = color( 255, 111, 97);

  //Create falling object
  ball = new Sprite(-100,0,10);
  ball.color = color( 255, 111, 97);
  ball.vel.y = 2;
}

/* DRAW LOOP REPEATS */
function draw() {
  if(screen == 0)
  {
    background(102, 187, 106);
  // Display enter button
  startButton.w = 100;
  startButton.h = 50;
  startButton.collision = "k";
  startButton.color = color(245, 255, 250);
  startButton.text = "Start";

    //setup home screen
    fill(0);
    textFont("Nunito");
    textSize(20); 
   text("In a world teeming with challenges and obstacles,\n the ball embodies us,\n and the paddle embodies our journey.\n A single misstep signifies a fresh\n beginning—a chance to rise anew.", width/2, height/2 - 100);
  if (startButton.mouse.presses())
  { 
    showGame();
    screen = 1;
  }
  }
  
  else if(screen == 1)
  {
    background( 0, 91, 127);
    fill(255);
    textSize(12);
    text("MOVE THE \nCATCHER WITH THE \nLEFT AND RIGHT \nARROW KEYS TO \nCATCH THE FALLING \nOBJECTS.", width-100, 20);

      //if falling object reaches bottom, move back to random position at top
  if (ball.y >= height)
  {
    ball.y = 0;
    ball.x = random(width);
    ball.vel.y = random(1, 5);
  }

  //Move catcher
  if (kb.pressing("left"))
  {
    board.vel.x = -3;
  }
  else if (kb.pressing("right"))
  {
    board.vel.x = 3;
  }
  else
  {
    board.vel.x = 0;
  }

  //Stop catcher at the edges of screen
  if (board.x < 45)
  {
  board.x = 45;
  }
  else if (board.x > 500)
  {
    board.x = 500;
  }

  //if falling object collides with catcher, move back to random position at top
  if (ball.collides(board))
  {
    ball.y = 0;
    ball.x = random(width);
    ball.vel.y = random(1,5);
    ball.direction = "down";
    score = score + 1;
  }
    
  //When ball hits ground you lose
  if (ball.y > 392) {
    ball.pos= {x:-45, y:-60};
    board.pos = {x:-300, y:-300};

    //draw restart button
    restart.pos = {x: 240, y: 250};
    restart.w = 120;
    restart.h = 50;
    restart.collider = "k";
    restart.color = color(255, 255, 240);
    restart.text = "Restart";
  } 

  if (restart.mouse.presses()){
    restartGame();
    score = 0;
    restart.pos = {x: -200,y: -200 };
    ball.pos = {x: 100, y: 0};
    board.pos = {x: 200, y: 380};
  }

  //Draw the score
  fill(255);
  textSize(20);
  text("Score = " + score, 50, 30);
}
}

function showGame(){
  
  startButton.pos = {x: -100, y: -100};
  board.pos = {x: 200, y: 380};
  ball.pos = {x: 100, y: 0};
}

  
//FUNCTIONS
function restartGame(){
  background(75, 0, 130);
  //restart game
  ball.y = 0;
  ball.x = random(width);
  ball.vel.y = random(1,5);
  ball.direction = "down"
  ball.speed = 2;
}