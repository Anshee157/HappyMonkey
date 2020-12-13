var monkey,monkey_running,monkey_collided;

var PLAY=1;
var END=0;
var COMPLETED=2;
var gameState=PLAY;
var score=0;
var survival_time=PLAY;

var bg,bgImage,gameOver,gameOverImage,win,winImage;
var banana,bananaImage,ground;
var obstacles,obstacleImage;
var bananaGroup,obstacleGroup;

function preload(){
  monkey_running=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_6.png","monkey_7.png","monkey_8.png");
  monkey_collided=loadImage("monkey_0.png");
  
  bananaImage=loadImage("banana.png");
  obstaclesImage=loadImage("obstacle.png");
  
  bgImage=loadImage("bg.jpg");
gameOverImage=loadImage("gameover.png");
  winImage=loadImage("you-win.png");
  
}
function setup(){
  createCanvas(500,500);
  
   bg=createSprite(60,170,500,500);
  bg.addImage(bgImage);
  
  win=createSprite(250,300,20,20);
  win.addImage(winImage);
  win.scale=0.5;

  
  monkey=createSprite(100,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.12;
  
 gameOver=createSprite(250,300,20,20);
gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  ground=createSprite(250,410,500,10);
  ground.visible=false;
  obstacleGroup =new Group();
bananaGroup   =new Group();
  
  //collider
  monkey.setCollider("circle",0,0,250);
  monkey.collide(ground);
  //monkey.debug=true;
}
function draw(){
  background("lightgreen") ;
  
  
  if (gameState===PLAY){
      if(keyDown("space")){
    monkey.velocityY=-12;
  }
    gameOver.visible=false;
    win.visible=false;
      //adding gravity
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
    
 bg.velocityX=-3;
    if(bg.x<100){
      bg.x=bg.width/2
    }
    survival_time=survival_time+Math.round(getFrameRate()/50);

    scoring();   
if(score===40){
  gameState=COMPLETED;
  }


    
if (obstacleGroup.isTouching(monkey)){
  gameState=END;
}
  }
  
if (gameState===COMPLETED){
  bg.velocityX=0;
  monkey.visible=false;
  gameOver.visible=false;

  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);  
  
  win.visible=true;

}  
    

    if (gameState===END){
      bg.velocityX=0; 
      monkey.destroy();
      gameOver.visible=true;

      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
   
  
      
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);  
      
    monkey.visible=false;
      
      
    }
    
  
  


  
  spawnObstacles();
  bananas();
  
  drawSprites();
  stroke("black");
  textSize(20);
      fill("black")
    text("score:  "+score,150,120);
  textSize(30);
  text("Survival Time: "+ survival_time,100,80)
  

}
function spawnObstacles(){
  if(frameCount%300===0){
  obstacles=createSprite(500,350,20,20);
  obstacles.addImage(obstaclesImage);
  obstacles.scale=0.2;
    obstacles.velocityX=-10;
    obstacles.setLifetime=100;
    obstacleGroup.add(obstacles);
    if (gameState===END){
    obstacleGroup.destroyEach();  
    }
    
  }
  
}
function bananas(){
  if (frameCount%80===0){
  banana=createSprite(400,200,20,20);
  banana.y=Math.round(random(120,200))
  banana.addImage(bananaImage);
  banana.scale=0.1;
    banana.velocityX=-10;
    banana.setLifetime=100;
    bananaGroup.add(banana);
    if (gameState===END){
    bananaGroup.destroyEach();  
    }
  }
}
function scoring(){
if (bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score=score+2;
} 
  switch (score){
   case 4:monkey.scale=0.12;
      break;
   case 8:monkey.scale=0.13;
      break;
   case 12:monkey.scale=0.14;
      break;
   case 16:monkey.scale=0.16;
      break;
   case 20:monkey.scale=0.17;
      break;
   case 24:monkey.scale=0.18;
      break;   
   case 28:monkey.scale=0.19;
      break; 
   case 32:monkey.scale=0.20;
      break;
   case 36:monkey.scale=0.25;
      break;
  }
}