var Monkey,MonkeyImage; 
var Banana,BananaImage; 
var Obstacle,ObstacleImage,ObstaclesGroup;
var Ground,GroundImage;
var gameState="play";
var survival_time;
var invisibleGround;
var bananaGroup;
var Monkey_Running
var Monkey_Jumping;
function preload(){
  
MonkeyImage=loadAnimation("sprite_2.png");
BananaImage=loadImage("banana.png");
ObstacleImage=loadImage("obstacle.png");  
Monkey_Running=loadAnimation("sprite_2.png","sprite_0.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
Monkey_Jumping=loadAnimation("sprite_0.png");
GroundImage=loadImage("ground2.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
  Monkey=createSprite(45,200,20,20);
Monkey.addAnimation("running",Monkey_Running);
Monkey.addAnimation("collided",MonkeyImage);
Monkey.addAnimation("jumping",Monkey_Jumping);
  Monkey.scale=0.1; 
ObstaclesGroup=createGroup();
bananaGroup=new Group();
Ground=createSprite(220,230,600,10);
Ground.addImage("ground",GroundImage);
invisibleGround=createSprite(230,235,1000,10);
survival_time=0;
bananaGroup.debug=true;   
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function draw() {
background("white");
if (gameState==="play"){
  Monkey.changeAnimation("running",Monkey_Running)
  if(keyDown("space")&& Monkey.y >= 100) {
    Monkey.velocityY=-10;  
  Monkey.changeAnimation(Monkey_Jumping);
  }
     survival_time = survival_time + Math.round(getFrameRate()/60);
    
  Monkey.velocityY = Monkey.velocityY + 0.7
 Ground.velocityX=-3;
  if (Ground.x<0){
    Ground.x=Ground.width/2;
  }
 if (bananaGroup.isTouching(Monkey)){
bananaGroup.destroyEach();
survival_time=survival_time+2;
 }
 
  spawnObstacles();
spawnBananas();
 if (Monkey.isTouching(ObstaclesGroup)){
  Monkey.changeAnimation("collided",MonkeyImage);
   ObstaclesGroup.destroyEach();
   gameState="end";
  }

}

  
 if (gameState==="end"){
   Ground.velocityX=0;
   Banana.visible=false;
   stroke("red");
   fill("red");
    textSize(30);
    text("GAME OVER!",200,200)
 stroke("blue");
  fill("blue");
  text("PRESS 'R' TO RESTART",140,260) 
 }
  
if (keyDown("R")){
 reset(); 
}
  Monkey.collide(Ground);
invisibleGround.visible=false;
  drawSprites();
fill("black");
 stroke("black");
 textSize(12); 
  text("Survival Time:"+survival_time,200,50)

}
function reset(){
 gameState="play"; 
survival_time  =0;
}
function spawnBananas (){
if (frameCount%80===0){
Banana=createSprite(300,100,20,20);
Banana.addImage(BananaImage);
Banana.scale=0.1;  
Banana.x=Math.round(random(500,600));
Banana.velocityX=-3;
Banana.lifetime=500;  
bananaGroup.add(Banana); 
}
}

function spawnObstacles(){
 if(frameCount%120===0){
  Obstacle=createSprite(200,220,20,20);
  Obstacle.addImage(ObstacleImage);
  Obstacle.scale=0.08;
  Obstacle.x=Math.round(random(200,400));
  Obstacle.velocityX=-3;
  Obstacle.lifetime=500; 
 ObstaclesGroup.collide(invisibleGround);
Obstacle.setCollider("rectangle",0,0,0,0);
   Obstacle.debug=false;
ObstaclesGroup.add(Obstacle);
 } 
}


