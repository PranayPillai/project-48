var PLAY = 1;
var END = 0;

var gameState = PLAY;
var tigerRunning,tiger,tigerRoar,tigerRoarImage,tigerRoarSound;
var hunterRunning, hunter, scaredHunterImage, scaredHunter
var backGround1,backGroundImage1,backGround2,backGroundImage2,backGround3,backGroundImage3;
var invisGround
var cactus,cactusImage,pine,pineImage,rock,rockimage;
var foodImage;
var obstacleGroup,foodGroup;
var score  = 0;
var flag = true;


function preload()
{
	tigerRunning = loadAnimation("images/s2.png","images/s3.png","images/s4.png","images/s5.png","images/s6.png");
	hunterRunning = loadAnimation("images/hunt1.png","images/hunt2.png","images/hunt3.png","images/hunt4.png");
	backGroundImage1 = loadImage("backGround/back1.jpeg");
	backGroundImage2 = loadImage("backGround/back2.jpeg");
	backGroundImage3 = loadImage("backGround/back3.jpeg");
	cactusImage = loadImage("obstacle/cac.png");
	pineImage = loadImage("obstacle/pine.png");
	rockimage = loadImage("obstacle/rock.png");
	foodImage = loadImage("images/food.png");
	tigerRoarImage = loadImage("images/tigerroar.png");
	scaredHunterImage = loadImage("images/scaredhunter.png");
	tigerRoarSound = loadSound("sounds/lionRoar.wav");

}

function setup() {
	createCanvas(600, 400);

	

	foodGroup = createGroup();
	obstacleGroup = createGroup();
		tiger = createSprite(200,335,20,20);
		//tiger.debug = true;
		tiger.setCollider("rectangle",0,0,350,100);
		tiger.addAnimation("running",tigerRunning);
		tiger.scale = 0.5
	
		backGround1 = createSprite(400,200,600,800);
		backGround1.velocity = -4;
		backGround1.addImage(backGroundImage1);
		backGround1.x = backGround1.width/2;
		backGround1.scale = 4.7;
		tiger.depth = backGround1.depth+1;
	
		invisGround = createSprite(300,379,600,5);
		
		hunter = createSprite(50,335,20,20);
		hunter.addAnimation("running",hunterRunning);
		hunter.scale = 0.3;
	}		
	
	
	function draw() {
	 tiger = createSprite(200,335,20,20);
	tiger.addAnimation("running",tigerRunning);
	tiger.scale = 0.5

	backGround1 = createSprite(400,200,600,800);
	backGround1.velocity = -4;
	backGround1.addImage(backGroundImage1);
	backGround1.x = backGround1.width/2;
	backGround1.scale = 4.7;
	tiger.depth = backGround1.depth+1;

	invisGround = createSprite(300,379,600,5);
	
	hunter = createSprite(50,335,20,20);
	hunter.addAnimation("running",hunterRunning);
	hunter.scale = 0.3;
  
	}


function draw() {
 if(gameState === 1){
  background(0);
  if(backGround1.x < 100){
    backGround1.x = backGround1.width/2;
  }
tiger.velocityY = tiger.velocityY + 1;
tiger.collide(invisGround);

if(tiger.isTouching(foodGroup)){
	score = score + 1;
	tiger.scale = tiger.scale + 0.01;
	
}

if(tiger.isTouching(obstacleGroup)){
	score = 0;
	backGround1.velocityX = 0;
	obstacleGroup.setVelocityXEach(0);
	foodGroup.setVelocityXEach(0);
	obstacleGroup.setLifetimeEach(-1);
	foodGroup.setLifetimeEach(-1);
	gameState = 0;
}
	  background(0);
	  if(backGround1.x < 100){
		backGround1.x = backGround1.width/2;
	  }
	if(keyDown("space")&& tiger.y > 150){
		tiger.velocityY = -12;
		console.log(tiger.y);
	}
	tiger.velocityY = tiger.velocityY + 1;
	tiger.collide(invisGround);
	
	if(tiger.isTouching(foodGroup)){
		score = score + 0.5;
		tiger.scale = tiger.scale + 0.01;
		foodGroup.destroyEach();
	}
	
	if(score === 10.5){
		backGround1.destroy();
		background("cyan");
		stroke("blue");
		fill("blue");
		textSize(20);
		text("Lesgooo!!! you scared the hunter to death lmao",100,200);
		tiger.destroy();
		tigerRoar = createSprite(200,335,20,20);
		tigerRoar.addImage(tigerRoarImage);
		tigerRoar.scale = 0.8;
		hunter.destroy();
		scaredHunter = createSprite(50,335,20,20);
		scaredHunter.addImage(scaredHunterImage);
		scaredHunter.scale = 0.3;
		obstacleGroup.velocityX = 0;
		foodGroup.velocityX = 0;
		foodGroup.destroyEach();
		obstacleGroup.destroyEach();
		obstacleGroup.setVelocityXEach(0);
		foodGroup.setVelocityXEach(0);
		if(flag){
		tigerRoarSound.play()
		flag = false;
		}
	

	}

	if(tiger.isTouching(obstacleGroup)){
		
		backGround1.velocityX = 0;
		obstacleGroup.setVelocityXEach(0);
		foodGroup.setVelocityXEach(0);
		obstacleGroup.setLifetimeEach(-1);
		foodGroup.setLifetimeEach(-1);
		gameState = 0;
	}
	
}

if(gameState === 0){
	obstacleGroup.velocityX = 0;
	foodGroup.velocityX = 0;
	foodGroup.destroyEach();
	obstacleGroup.destroyEach();
	obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
	tiger.destroy();
	hunter.destroy();
	backGround1.destroy();
	background("blue");
	stroke("red");
	fill("red");
	textSize(20);
	text("You died trying to escape the hunter",150,200);
}

  food();
  obstacle();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score ,50,50);
}

function food(){
	if(frameCount % 130 === 0){
		var food = createSprite(600,370,10,40);
		food.y = Math.round(random(50,100));
		food.addImage(foodImage);
		food.scale = 0.2;
		food.velocityX = -4;
		food.lifetime = 200;

		foodGroup.add(food);
		
	}
}

	function obstacle(){
		if(frameCount % 200 === 0){
			var rock = createSprite(600,350,10,40);
			//rock.debug = true;
			//rock.setCollider(circle,0,0,20)
			rock.velocityX = -4;
			rock.addImage(rockimage);
			rock.scale = 0.2;
			rock.lifetime = 300;
			obstacleGroup.add(rock);
			
		}
	}	




