var play=0;
var end=1;
var gameState = play;
var ground,forest,forest1;
var monkey , monkey_running;
var banana ,bananaImage,bananaGrp, obstacle, obstacleImage,obstacleGrp;
var cage,cage1;
var score,survival;
var ab,ab1
var scoreSound,birdSound,losingSound;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forest1 = loadImage("forest.jpg");
  
  cage1 = loadImage("zoo cage.jpg");
 
  ab1 = loadImage("sprite_1.png");
  
  restart1 = loadImage("restart.png");
  
  scoreSound = loadSound("Tada-sound.mp3");
  
  birdSound = loadSound("bird.mp3");
  
  losingSound = loadSound("losing.mp3");
}



function setup() {
  
 createCanvas(500,450);
  
  forest = createSprite(300,180,600,500);
  forest.addImage(forest1);
  forest.velocityX=-4;
  forest.x=forest.width/2;
  forest.scale=1;
  
  ground = createSprite(20,430,1000,10);
  ground.visible=false;
  
  monkey = createSprite(100,350,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  edges=createEdgeSprites();
  
  bananaGrp = createGroup();
  obstacleGrp = createGroup();
  
  score=0;
  survival=0;
 
  //monkey.debug=true;
  monkey.setCollider("rectangle",0,0,350,450);
}


function draw() {
 background("white");
  
 if(gameState===play){
   
   birdSound.play();
   
   if(monkey.isTouching(bananaGrp)){
     score=score+1;
     scoreSound.play();
     bananaGrp.destroyEach();
   }
   
   survival=survival+Math.round(frameCount/60);
   
   if(keyDown("space")&& monkey.y>340){
    monkey.velocityY= -10;
  }
   
   monkey.velocityY = monkey.velocityY+0.3;
  
   spawnBanana();
   spawnObstacle();
  
   if(forest.x<0){
    forest.x=forest.width/2;
  }
   
   console.log(frameCount);
   if(frameCount>350){
     forest.velocityX=-8;
     obstacleGrp.setVelocityXEach(-10);
     bananaGrp.setVelocityXEach(-10);
     birdSound.play();
   }
   
   if(monkey.isTouching(obstacleGrp)){
     gameState=end;
     losingSound.play();
   }
 }
  
  else if(gameState===end){
    
    birdSound.stop();
    scoreSound.stop();
    
    monkey.destroy();
    
    ab = createSprite(200,270,10,10);
    ab.addImage(ab1);
    ab.scale=0.2;
    
    forest.destroy();
    
    cage = createSprite(250,225,600,500);
    cage.addImage(cage1);
    cage.depth=monkey.depth-1;
    cage.scale=1;
  
  }
  
   monkey.collide(ground);
  
  drawSprites();
  
  fill("black");
  text("algerian");
  stroke("black");
  text("SCORE : "+score,400,20);
  text("SURVIVAL TIME : "+survival,20,20);
  
  if(gameState===end){
    fill("white");
    stroke("white");
    //text("algerian");
    textSize(40);
    text("GAME OVER !",80,150);
    fill("black");
    textSize(20);
    stroke("black");
    text("Oh no! The poor monkey is back on its cage!",45,385);
  }
}

function reset(){
  
  gameState=play;
  
  cage.destroy();
}

function spawnBanana(){
  if(frameCount%100===0){
    banana = createSprite(500,200,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-5;
    banana.lifetime=300;
    
    banana.y = Math.round(random(100,300));
    banana.depth=monkey.depth-1;
    bananaGrp.add(banana);

  }
}

function spawnObstacle(){
  if(frameCount%90===0){
    obstacle = createSprite(450,400,10,10);
    obstacle.addImage("img",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
    obstacle.lifetime=300;
    obstacle.depth=monkey.depth-1;
    
    obstacleGrp.add(obstacle);
  }
}





