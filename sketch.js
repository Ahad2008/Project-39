var p1,p2,z1,z2,z3;
var bg,bgim;
var gun,gi, buli;
var shoot = 0;
var score = 0;
var bullet,zGroup,bulletGroup;
var play = 0;
var end = 0;
var gameState = play;

function preload() {
  bgim = loadImage("bgi.png");
  gi = loadImage("gun.png");
  buli = loadImage("bul.png");
  z1i = loadImage("zo1.png");
  z2i = loadImage("zo2.png");
  z3i = loadImage("zo3.png");
}

function setup() {  
  canvas = createCanvas(1000,700);
  bg = createSprite(500,150,30,20);
  bg.addImage(bgim);
  bg.velocityY = (5 + score/10);

  gun = createSprite(500,550, 1, 1);
  gun.addImage(gi);
  gun.scale = 0.3;
  
  zGroup = new Group;
  bulletGroup = new Group;
  
  end = createSprite(250,700,10000000000,50);
  end.visible = false;
}

function draw() {
  background(0);

    if(gameState === play) {
      if(bg.y > 500) {
        bg.y = 300;
      }
      shoot = shoot - 1;
  
      if(keyDown("space") && shoot < 417) {
        bullet = createSprite(gun.x,gun.y - 130);
        bullet.addImage(buli);
        bullet.velocityY = -50; 
        bullet.scale = 0.06;
        bullet.lifetime = 10;
        bulletGroup.add(bullet);
        shoot = bullet.y;
      } 
  
      if(keyDown("right") && gun.x < 1400) {
        gun.x = gun.x + 20;
      }
  
      if(keyDown("left") && gun.x > 50) {
        gun.x = gun.x - 20;
      }
      
      if(bulletGroup.isTouching(zGroup)) {
        zGroup.destroyEach();
        bulletGroup.destroyEach();
        score = score + 1;  
      }

    zs();
    drawSprites();
    strokeWeight(15);
    stroke("red");
    fill("green");
    textSize(30);
    text("score : " + score,50,60)
    
    if(zGroup.isTouching(end)) {
      zGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    bg.velocityY = 0;
    strokeWeight(10);
    stroke("red");
    fill("orange");
    textSize(40);
    text("GAME OVER!", 350, 350);   
  }
}

function zs() {
  if(frameCount % 40 === 0) {
    z1 = createSprite(200, -850, 10, 10);
    z1.velocityY = (10 + score/2);
    z1.lifetime = 200;
    z1.addImage(z1i);
    z1.scale = 0.2;
    zGroup.add(z1);

    z2 = createSprite(500, -1000, 10, 10);
    z2.velocityY = (10 + score/2);
    z2.lifetime = 200;
    z2.addImage(z2i);
    z2.scale = 0.2;
    zGroup.add(z2);

    z3 = createSprite(800, -1790, 10, 10);
    z3.velocityY = (10 + score/2);
    z3.lifetime = 200;
    z3.addImage(z3i);
    z3.scale = 0.05;
    zGroup.add(z3);

    var rand = Math.round(random(1,3));
    if(rand === 1){
      z1.y = -10
    }
    else if (rand === 2){
      z2.y = -10
    }
    else if (rand === 3){
      z3.y = -10
    }
  }
}
