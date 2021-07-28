var dashPlayer,dashPlayerImage;
var spike1,spike2,spike3,spikey;
var spike1Img,spike2Img,spike3Img;
var robot,robotImg;
var background,backgroundImg;
var spikeGroup;
var score,highestScore
var gameState
var PLAY=0
var END=0
var gameState=PLAY;
var jump,die,check;
var x

var score;
var PLAY=1;
var END=0;
var gamestate=PLAY;

var highestScore;
var obstacle,obstaclesGroup, obstacle1, obstacle2, obstacle3;
var invisibleGround
var ground,groundImage;
var spikeyGroup;


function preload(){
dashPlayerImage=loadImage("images/dash_player.png")
spike1Img=loadImage("images/spike1.png")
spike2Img=loadImage("images/spike2.png")
spike3Img=loadImage("images/spike3.png")
robotImg=loadImage("images/robot_(1).png")
backgroundImg=loadImage("images/bg.jpg")
jump=loadSound("jump.mp3")
die=loadSound("die.mp3");
  check=loadSound("checkPoint.mp3");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
groundImage=loadImage("images/ground2.png")
}
function setup(){

createCanvas(600,200)
x=0

dashPlayer=createSprite(50,90,15,50)
dashPlayer.addImage(dashPlayerImage)
dashPlayer.scale=0.2


ground=createSprite(200,180,400,20)
ground.shapeColor="green"
ground.addImage("ground",groundImage);
ground.x = ground.width/2;
ground.velocityX=-4;

invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
gameOver=createSprite(300,80,20,20);
  gameOver.addImage("gameOver.png",gameoverImage);
  gameOver.scale=0.5;
  
  gameOver.visible=false;
  
  restart=createSprite(300,120,20,20);
  restart.addImage("restart.png",restartImage);
  restart.scale=0.5;
  
  restart.visible=false;
  
  highestScore=0
  
  
  score = 0;

spikeyGroup= new Group();

}
function draw(){
  background("skyblue")
  text("Score: "+ score, 400,50); 
  text("highestScore: "+ highestScore, 300,50); 
  if(gameState===PLAY){
    if(score>0 && score%100===0){
      check.play();
    }
    x++;
  score = score + Math.round(x/60)
  if(ground.x<0){
   ground.x=ground.width/2;
  }
  if(keyDown("space") && dashPlayer.y>=130){
    dashPlayer.velocityY=-10
    jump.play();
  }
  dashPlayer.velocityY=dashPlayer.velocityY+0.3
  // ground .velocityX=-4
  if (ground.x <0){
    ground.x = ground.width/2;
    
 }
    dashPlayer.collide(ground)
  
   
spawnObstacles();
  
if(spikeyGroup.isTouching(dashPlayer)){
  gameState=END;
  die.play();
}
  }
  
else if(gameState===END){
  ground.velocityX=0;
  
  restart.visible=true;
  gameOver.visible=true;
  dashPlayer.velocityY=0;
  spikeyGroup.setVelocityXEach(0)
  spikeyGroup.setLifetimeEach(-1);
  if(mousePressedOver(restart)){
    reset();
    }
  }
  
drawSprites();
}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var spikey = createSprite(600,165,10,40);
    spikey.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: spikey.addImage(spike1Img);
              break;
      case 2: spikey.addImage(spike2Img);
              break;
      case 3: spikey.addImage(spike3Img);
              break;
      default: break;
}
spikeyGroup.add(spikey);
spikey.scale=0.4    
  }
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  spikeyGroup.destroyEach();
    
    if(highestScore<score){
    highestScore=score;
    }
    score=0;
    x=0;
    
  }