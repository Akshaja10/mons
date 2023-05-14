var PLAY = 1;
var END = 0;
var gameState = PLAY;

var worldImg, world;

var invisbleGround, invisble;

var monster, monsterImg;

var goldGroup, goldImg,gold;
var blockGroup, blockImg,block;
var veggiesGroup,veggie1,veggie2,veggie3,veggie;
var cookieGroup, cookieImg;

var score = 0;

var gameOver, restart

function preload(){
    monsterImg = loadImage("cookiemonster.png")

    blockImg = loadImage("block.png");
    worldImg = loadImage("world.jpg");

    veggie1 = loadImage("brocolli.png");
    veggie2 = loadImage("carrot.png");
    veggie3 = loadImage("tom.png");
    
    goldImg = loadImage("goldblocks.png");
    cookieImg = loadImage("cookie.png");

    //restart and gameover

}

function setup() {
    createCanvas(windowWidth,windowHeight);

    monster = createSprite(50,height-10,20,50);
    monster.addImage("monster",monsterImg);

    world = createSprite(width/2,height,width,20);
    world.addImage("world",worldImg);
    world.x = world.width /2;
    world.velocityX = -(6 + 3*score/100);

    //start over and restart

    invisibleGround = createSprite(width/2,height-10,width,10);
    invisibleGround.visible = false;

    score = 0;

}

function draw() {
    background(255);
    text("Score: "+ score, 500,50);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        world.velocityX = -(6 + 3*score/100);
      
        if((touches.length > 0 || keyDown("space") && monster.y >= height-100)) {
          monster.velocityY = -12;
          touches = [];
        }
      
        monster.velocityY = monster.velocityY + 0.8
      
        if (world.x < 0){
          world.x = world.width/2;
        }
      
        monster.collide(world);
        spawnBlocks();
        spawnCookie();
        spawnGold();
        spawnVeggies();
      
        if (blockGroup.isTouching(monster)) {
          gameState = END;
        }
    }

    else if (gameState === END) {
        //gameOver.visible = true;
        //restart.visible = true;
        
        world.velocityX = 0;
        monster.velocityY = 0;
        blockGroup.setVelocityXEach(0);
        cookieGroup.setVelocityXEach(0);
        veggiesGroup.setVelocityXEach(0);
        goldGroup.setVelocityXEach(0);
        
        blockGroup.setLifetimeEach(-1);
        cookieGroup.setLifetimeEach(-1);
        veggiesGroup.setLifetimeEach(-1);
        goldGroup.setLifetimeEach(-1);
        
        //if(mousePressedOver(restart)) {
          //reset();
        //}
      }

      drawSprites()
}

function spawnBlocks() {
    if(frameCount % 60 === 0) {
        var block = createSprite(width/2,height-15,10,40);
        block.velocityX = -(6 + 3*score/100);
        block.addImage(blockImg);

        var random = Math.round(random(1,6));

        block.scale = 0.5;
        block.lifetime = 300;
        blockGroup.add(block);
    }
}

function spawnVeggies(){
  if(frameCount % 60 === 0) {
    var veggie = createSprite(width/2,height-15,10,40);
    veggie.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: veggie.addImage(veggie1);
              break;
      case 2: veggie.addImage(veggie2);
              break;
      case 3: veggie.addImage(veggie3);
              break;
      default: break;
    }
}
}

function spawnCookie(){
  if(frameCount % 60 === 0) {
    var cookie = createSprite(width/2,height-15,10,40);
    cookie.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cookie.addImage(cookie);
              break;
      default: break;
    }
}
}

function spawnGold(){
  if(frameCount % 60 === 0) {
    var gold = createSprite(width/2,height-15,10,40);
    gold.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: gold.addImage(gold);
              break;
      default: break;
    }
}
}
