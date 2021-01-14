var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var  monkey_collided;


function preload(){
 
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,300)  


  monkey = createSprite(50,255,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1
  
  
  obstacle = createSprite(700,255,20,40);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-8; 
  obstacle.scale=0.2
   
  banana = createSprite(700,100,20,40);
  banana.addImage(bananaImage);
  banana.velocityX=-8; 
  banana.scale=0.1;
  
  ground = createSprite(300,290,2000,10);
  ground.velocityX=-4;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  

}


function draw() {
background("skyBlue")
 
 text("Survival Time: "+ score, 300,50);
 stroke("Black");
 textSize(100)
  
 if(gameState === PLAY){
   

    ground.velocityX = -4 ;
    //scoring
    score = score + Math.round(getFrameRate()/60);
   
   
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 160) {
        monkey.velocityY = -12;
    }
   
    //add gravity
    monkey.velocityY = monkey.velocityY + 1.0;
   
   spawnObstacles();
   spawnBananas();
 
  if(monkey.isTouching(obstacle)){
    obstacle.velocityX=0;
    banana.velocityX=0;
    monkey.velocityX=0;
    gameState=END
  }
  if(monkey.isTouching(banana)){
    banana.destroy();
  }
   
  }
   else if (gameState === END){
     //change the trex animation
   monkey.changeAnimation("collided", monkey_collided);
   
     obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1); 
      
      ground.velocityX = 0;
      
      
   }     
      //set lifetime of the game objects so that they are never destroyed
      
    
 monkey.collide(ground)  
  

 
drawSprites();
}

function spawnObstacles(){
  
 if (frameCount % 300 === 0) { 
obstacle = createSprite(700,255,20,40);

obstacle.addImage(obstacleImage);
obstacle.velocityX=-8; 
obstacle.scale=0.2;
obstacle.lifetime=300;
obstacleGroup.add(obstacle);
}
}
  
function spawnBananas(){
if (frameCount % 80 === 0) {   
banana = createSprite(700,100,20,40);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage);
banana.velocityX=-8; 
banana.scale=0.1;
banana.lifetime=300;
FoodGroup.add(banana);
}
}

