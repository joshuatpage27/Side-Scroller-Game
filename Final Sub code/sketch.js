/*
The Game Project

Part 7
Final Submission
*/
var w = window.innerWidth;
var h = window.innerHeight; 
var cameraPosX;
var gameChar_x;
var gameChar_y;
var shipChar_x;
var shipChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var treePos_y;
var tree_x;
var cloud_s;
var cloud;
var mountain;
var mountain_s;
var ufos;
var collectables;
var canyons;
var game_score;
var flagpole;
var lives;
var platforms;
var enemies;
var jumpSound;
var tokenSound;
var levelUpSound;
var lifeLostSound;
var enemySound;
var takeOffSound;
function preload()
{
    //load sounds here
	soundFormats('mp3','wav');
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
	tokenSound = loadSound('assets/token.wav');
	tokenSound.setVolume(0.3);
	lifeLostSound = loadSound('assets/lifeLost.wav');
	lifeLostSound.setVolume(0.1);
	enemySound = loadSound('assets/enemy.wav');
	enemySound.setVolume(0.1);
	takeOffSound = loadSound('assets/takeOff.wav');
	takeOffSound.setVolume(0.3);
}
function setup()
{
	createCanvas(w, h);
	floorPos_y = height * 3/4;
	lives = 3;
	startGame();
}

function draw()
{
	//Sky
	background(127,255,212);
	//Ground
	noStroke();
	fill(190);
	rect(0, floorPos_y, width, height - floorPos_y); 
	//Life Tokens
	textSize(15);
	fill(255,102,102);
  	stroke(0);
  	strokeWeight(1);
	text("Life:", 150, 25)
	//Score
	textSize(15);
	fill(255);
  	stroke(0);
  	strokeWeight(1);
	text("Score: " + game_score, 20, 25)
	//Lives
	checkPlayerDie();
	push();
	//side-scroll- Camera 
	cameraMan();
	//Sun 
	fill(251, 96, 65)
    ellipse(810, 100, 100, 100);
	//Mountains
	drawMountains();
	//Clouds
	drawClouds();
	//Trees
	drawTrees();
	//ufo
	drawUfo();
	//Canyon
	for(var i = 0; i < canyons.length; i++)
		{
			drawCanyon(canyons[i]);
			checkCanyon(canyons[i]);
		}
	//platforms
	for(var i = 0; i < platforms.length; i++)
		{
			platforms[i].draw();
		}
	//Collectables
	for(var i = 0; i < collectables.length; i++)
		if(!collectables[i].isFound)
		{
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	//Flagpole 
	if (flagpole.isReached == false)
		{	
	checkFlagpole();
		}
	renderFlagpole()
	//Enemies
	for(var i = 0; i < enemies.length; i++)
		{
			enemies[i].draw();
			var isContact = 
			enemies[i].checkContact(gameChar_x, gameChar_y);
			if(isContact)
				{
					if(lives > 0)
						{
							startGame();
							break;
						}
				}
		}
	//The game character
	drawGameChar();
	//Game Over
	if(lives == 0)
		{
			fill(255,255,255);
			textSize(40);
			text("Game Over... Press Spacebar to Continue", width * 1/2 - 400, height * 1/2);
		}
	//Level Complete
	if(flagpole.isReached)
		{
			fill(255,255,255);
			textSize(50);
			text("Level Complete... Press Spacebar to Continue", cameraPosX + 100, height * 1/2); 
		}
pop();
	///////////INTERACTION CODE//////////
	//Conditional statements to move the game character 
	//Game Character Left/Right
	if(isLeft == true)
		{
			gameChar_x -= 5;
		}
	if(isRight == true)
		{
			gameChar_x += 5;
		}
	//Game Character Rise and fall 
	if(gameChar_y < floorPos_y)
		{
		var isContact = false;
		for(var p = 0; p < platforms.length; p++)
			{
				if(platforms[p].checkContact(gameChar_x, gameChar_y))
				{
					isContact = true;
					isFalling = false;
					break;
				}
			}
			if(isContact == false)
				{
		gameChar_y += 3;
		isFalling = true;
				}
		}
	else
		{
		isFalling = false;
		}
	if(isPlummeting)
		{
			gameChar_y +=5;
			isRight = false;
			isLeft = false;
		}
}
//Key Functions
function keyPressed()
{
	// if statements to control the animation of the character when
	if(keyCode == 37 && isPlummeting == false)
	{
		isLeft = true;
	}
	else if(keyCode == 39 && isPlummeting == false)
	{
		isRight = true;
	}
	else if(keyCode == 32 && isFalling == false && !flagpole.isReached && lives > 0 || keyCode == 38 && isFalling == false && !flagpole.isReached && lives > 0)
		{
			gameChar_y = gameChar_y - 120;
			jumpSound.play();
		}
}
function keyReleased()
{
	// if statements to control the animation of the character when keys are released.
	if(keyCode == 37 )
	{
		isLeft = false;
	}
	else if(keyCode == 39)
	{
		isRight = false;
	}
}
function drawClouds()
{
	for(var y = 0; y < cloud_s.length; y ++)
	{	
		 fill(200)
		 ellipse(cloud_s[y], cloud.y_pos, cloud.width, cloud.height);
		 ellipse(cloud_s[y] + 40, cloud.y_pos-10, cloud.width-50, cloud.height -50);
		 ellipse(cloud_s[y] + 40,cloud.y_pos + 10,cloud.width -30, cloud.height - 40);
		 ellipse(cloud_s[y] -50, cloud.y_pos, cloud.width - 40,cloud.height -40);
		 ellipse(cloud_s[y] - 70, cloud.y_pos, cloud.width - 30,cloud.height -30);
		//long clouds
		 ellipse(cloud_s[y] - 30, cloud.y_pos, cloud.width + 200, cloud.height - 90);
		 ellipse(cloud_s[y] + 20,cloud.y_pos + 10, 300, 7);
		 ellipse(cloud_s[y] + 220, cloud.y_pos + 25, cloud.width + 150, cloud.height - 93);
		 ellipse(cloud_s[y] + 170, cloud.y_pos + 15, cloud.width +150, cloud.height - 93);
	}
}
function drawMountains()
{
	for(var z = 0; z < mountain_s.length; z ++)
	{
		noStroke();
		fill(80);
		triangle(mountain_s[z], mountain.y_pos, mountain_s[z] -230, mountain.y_pos + 332, mountain_s[z] + 175, mountain.y_pos +332); 
		triangle(mountain_s[z] + 200, mountain.y_pos - 50, mountain_s[z] -230, mountain.y_pos + 332, mountain_s[z] + 450, mountain.y_pos +332);
		fill(30);
		triangle(mountain_s[z], mountain.y_pos, mountain_s[z] -50, mountain.y_pos + 332, mountain_s[z] - 230, mountain.y_pos + 332);
		triangle(mountain_s[z] +200, mountain.y_pos - 50, mountain_s[z] +250, mountain.y_pos +332, mountain_s[z] - 170, mountain.y_pos + 332);
	}
}
function drawTrees()
{
	for(var i = 0; i < tree_x.length; i ++)
	{
		//Trunk
		fill(86, 70, 59);
		rect(tree_x[i] + 36, floorPos_y - 40, 11, 42);
		//Branch
		fill(59, 86, 59);
		triangle(tree_x[i] + 40, treePos_y - 200, tree_x[i] +20, treePos_y - 100, tree_x[i] +60, treePos_y - 100);
		//Branch
		fill(59, 86, 59);
		triangle(tree_x[i] + 40, treePos_y - 200, tree_x[i] +20, treePos_y - 40, tree_x[i] +60, treePos_y-40);
	}
}
function drawCollectable(t_collectable)
{
	if(t_collectable.isFound == false)
	{
		noStroke();
		fill(246, 12, 175, 100);
		ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size -47, t_collectable.size -30);
		ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size -30, t_collectable.size -47);
		fill(0,191,255);
		triangle(t_collectable.x_pos, t_collectable.y_pos - 10, t_collectable.x_pos + 5, t_collectable.y_pos, t_collectable.x_pos, t_collectable.y_pos);
		triangle(t_collectable.x_pos, t_collectable.y_pos + 10, t_collectable.x_pos - 5, t_collectable.y_pos, t_collectable.x_pos, t_collectable.y_pos);
	}
}
function drawCanyon(t_canyon)
{	
    fill(30);
	rect(t_canyon.x_pos, floorPos_y, t_canyon.width, width - floorPos_y);
	fill(30);
	triangle(t_canyon.x_pos + 50, floorPos_y, t_canyon.x_pos + 110, floorPos_y + 120, t_canyon.x_pos - 20, floorPos_y + 100);
}
function checkCollectable(t_collectable)
{
	if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size)
	{
		t_collectable.isFound = true;
		game_score += 1;
		tokenSound.play();
	}
}
function checkCanyon(t_canyon)
{
	if(gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
		{
			isPlummeting = true;
		}
	if(isPlummeting == true)
		{
			lifeLostSound.play();
			gameChar_y += 3;
		}	
}
function drawGameChar()
{
	if(lives <= 0 || flagpole.isReached)
		{
			return;
		}
	if(isLeft && isFalling)
	{
		// jumping-left code
		//Head
		fill(220);
		ellipse(gameChar_x, gameChar_y - 65, 18, 22)
		//Visor
		fill(0);
		arc(gameChar_x, gameChar_y - 65, 20, 22, 2, HALF_PI - 4);
		//Torso
		fill(61, 109, 146);
		rect(gameChar_x -10, gameChar_y - 53, 20, 34, 10, 3, 15, 15);
		//Legs
		rect(gameChar_x - 20, gameChar_y - 25, 8, 27, 10, 10, 10, 2);
		rect(gameChar_x - 10, gameChar_y - 25, 8, 27, 10, 10, 10, 2);
		rect(gameChar_x -20, gameChar_y - 30, 27, 10, 10, 10, 1, 10);
		//Knee
		fill(220);
		ellipse(gameChar_x - 17, gameChar_y -24, 8, 6);
		//Arms
		fill(200);
		rect(gameChar_x, gameChar_y - 50, 8, 27, 10, 10, 10, 2);
	}
	else if(isRight && isFalling)
	{
		//jumping-right code
		//Head
		fill(225)
		ellipse(gameChar_x, gameChar_y - 65, 18, 22)
		//Visor
		fill(0)
		arc(gameChar_x, gameChar_y - 65, 20, 22, 100, 13.5);
		//Torso
		fill(61, 109, 146)
		rect(gameChar_x -10, gameChar_y - 53, 20, 34, 3, 10, 15, 15)
		//Legs
		rect(gameChar_x, gameChar_y - 25, 8, 27, 10, 10, 2, 10)
		rect(gameChar_x + 10, gameChar_y - 25, 8, 27, 10, 10, 2, 10)
		rect(gameChar_x - 10, gameChar_y - 30, 27, 10, 10, 10, 1, 10)
		//Knee
		fill(220)
		ellipse(gameChar_x + 15, gameChar_y -24, 8, 6);
		//Arms
		fill(200);
		rect(gameChar_x -7, gameChar_y - 50, 8, 27, 10, 10, 10, 2);
	}
	else if(isLeft)
	{
		//walking left code
		//Head
		fill(220);
		ellipse(gameChar_x, gameChar_y - 65, 18, 22);
		//Visor	
		fill(0)
		arc(gameChar_x, gameChar_y - 65, 20, 22, 2, HALF_PI - 4);
		//Torso
		fill(61, 109, 146);
		rect(gameChar_x -10, gameChar_y - 53, 20, 34, 10, 3, 15, 15);
		//Legs
		rect(gameChar_x -8, gameChar_y - 25, 8, 27, 10, 10, 10, 2);
		rect(gameChar_x, gameChar_y - 25, 8, 27, 10, 10, 10, 2);
		//Knees
		fill(200);
		ellipse(gameChar_x - 5, gameChar_y -11, 7, 5);
		ellipse(gameChar_x + 3, gameChar_y -11, 9, 6);
		//Arms
		fill(200);
		rect(gameChar_x - 1, gameChar_y - 50, 8, 27, 10, 10, 10, 2);
	}
	else if(isRight)
	{
		//walking right code
		//Head
		fill(220)
		ellipse(gameChar_x, gameChar_y - 65, 18, 22)
		//Visor
		fill(0)
		arc(gameChar_x, gameChar_y - 65, 20, 22, 100, 13.5);
		//Torso
		fill(61, 109, 146)
		rect(gameChar_x -10, gameChar_y - 53, 20, 34, 3, 10, 15, 15)
		//Legs
		rect(gameChar_x -8, gameChar_y - 25, 8, 27, 10, 10, 2, 10)
		rect(gameChar_x, gameChar_y - 25, 8, 27, 10, 10, 2, 10)
		//Knees
		fill(200);
		ellipse(gameChar_x - 3, gameChar_y -11, 9, 6);
		ellipse(gameChar_x + 5, gameChar_y -11, 7, 5);
		//Arms
		fill(200);
		rect(gameChar_x -6, gameChar_y - 50, 8, 27, 10, 10, 10, 2);
	}
	else if(isFalling || isPlummeting == true)
	{
		//jumping facing forwards code
		//Head
		fill(220);
		ellipse(gameChar_x, gameChar_y - 65, 20, 22);
		//Visor
		fill(0);
		arc(gameChar_x, gameChar_y - 63, 20, 18, 85, 12.5);
		//Torso
		fill(61, 109, 146);
		rect(gameChar_x - 14, gameChar_y - 53, 27, 34, 5, 5, 15, 15);
		fill(220,220,200);
		stroke(2);
		strokeWeight(1);
		triangle(gameChar_x, gameChar_y - 48, gameChar_x + 5, gameChar_y - 38, gameChar_x, gameChar_y - 38);
		triangle(gameChar_x, gameChar_y - 28, gameChar_x - 5, gameChar_y - 38, gameChar_x, gameChar_y - 38);
		noStroke();
		//Legs
		fill(61, 109, 146);
		rect(gameChar_x - 10, gameChar_y - 33, 10, 27, 10, 10, 1, 10);
		rect(gameChar_x + 5, gameChar_y - 33, 10, 27, 10, 10, 1, 10);
		//Arms
		fill(200);
		rect(gameChar_x + 11, gameChar_y - 50, 6, 27, 10, 10, 10, 2);
		rect(gameChar_x - 16, gameChar_y - 50, 6, 27, 10, 10, 10, 2);
		//Knees
		fill(200);
		ellipse(gameChar_x - 5, gameChar_y -20, 10, 6);
		ellipse(gameChar_x + 10, gameChar_y -20, 10, 6);
	}
	else
	{
		//standing front facing code
		//head
		fill(220);
		ellipse(gameChar_x, gameChar_y - 65, 20, 22);
		line(gameChar_x -9, gameChar_y - 70 , gameChar_x + 9, gameChar_y - 70);
		//Visor
		fill(0);
		arc(gameChar_x, gameChar_y - 63, 20, 18, 85, 12.5);
		//Torso
		fill(61, 109, 146);
		rect(gameChar_x - 13, gameChar_y - 53, 27, 34, 5, 5, 15, 15);
		fill(220,220,200);
		stroke(2);
		strokeWeight(1);
		triangle(gameChar_x, gameChar_y - 48, gameChar_x + 5, gameChar_y - 38, gameChar_x, gameChar_y - 38);
		triangle(gameChar_x, gameChar_y - 28, gameChar_x - 5, gameChar_y - 38, gameChar_x, gameChar_y - 38);
		noStroke();
		//Legs
		fill(61, 109, 146);
		rect(gameChar_x - 12, gameChar_y - 25, 10, 27, 10, 10, 1, 10);
		rect(gameChar_x + 3, gameChar_y - 25, 10, 27, 10, 10, 1, 10);
		fill(200);
		ellipse(gameChar_x - 7, gameChar_y -10, 10, 6);
		ellipse(gameChar_x + 8, gameChar_y -10, 10, 6);
		//Arms
		rect(gameChar_x + 11, gameChar_y - 50, 6, 27, 10, 10, 10, 2);
		rect(gameChar_x - 16, gameChar_y - 50, 6, 27, 10, 10, 10, 2);
		fill(200);
	}
}
function drawUfo()
{
	if(dist(gameChar_x, gameChar_y, ufos.x_pos + 250, ufos.y_pos) < 70)
	{
		ufos.isUnder = true;
	}
	else
	{
		ufos.isUnder = false;
	}
	if(ufos.isUnder == false)
	{
	    stroke(225,225,225,100);
		strokeWeight(5);
		fill(0, 0, 51)
		ellipse(ufos.x_pos, ufos.y_pos - 255, 20, 10);
	    noStroke();
		ellipse(ufos.x_pos, ufos.y_pos - 250, 70, 10);
		fill(13, 221, 227, 100);
		triangle(ufos.x_pos, 200, ufos.x_pos + 200, 450, ufos.x_pos + 300, 450);
		ufos.x_pos += 1;
	}
	if(ufos.isUnder == true)
	{
		stroke(225,225,225,100);
		strokeWeight(5);
		fill(0, 0, 51)
		ellipse(ufos.x_pos, ufos.y_pos - 255, 20, 10);
	    noStroke();
		ellipse(ufos.x_pos, ufos.y_pos - 250, 70, 10);
		fill(205, 84, 75, 100);
		triangle(ufos.x_pos, 200, ufos.x_pos + 200, 450, ufos.x_pos + 300, 450);
		ufos.x_pos += 1;
		gameChar_x = random(gameChar_x - 5, gameChar_x + 5);
	}
}
function renderFlagpole()
{  
	if(flagpole.isReached)
	{
		//LeftWing
		stroke(0,191,255,100);
		strokeWeight(10);
		strokeJoin(ROUND);
		fill(20)
		triangle(flagpole.x_pos - 10, flagpole.y_pos - 155, flagpole.x_pos + 280, flagpole.y_pos -80, flagpole.x_pos + 15, flagpole.y_pos - 80);
		fill(75);		
		stroke(60);
		strokeWeight(1);
		strokeJoin(ROUND);
		triangle(flagpole.x_pos + 8, flagpole.y_pos - 140, flagpole.x_pos + 230, flagpole.y_pos - 85, flagpole.x_pos + 30, flagpole.y_pos - 85);
		fill(10);
		ellipse(flagpole.x_pos + 20, flagpole.y_pos - 115, 40, 65);
		//Spaceman
		//Head
		stroke(60);
		strokeWeight(1);
		fill(225);
		ellipse(shipChar_x, shipChar_y - 65, 18, 22);
		//Visor
		fill(0)
		arc(shipChar_x, shipChar_y - 65, 20, 22, 100, 13.5);
		//Torso
		fill(61, 109, 146);
		rect(shipChar_x -10, shipChar_y - 53, 20, 34, 3, 10, 15, 15);
		//Legs
		rect(shipChar_x, shipChar_y - 25, 8, 27, 10, 10, 2, 10);
		rect(shipChar_x + 10, shipChar_y - 25, 8, 27, 10, 10, 2, 10)
		rect(shipChar_x - 10, shipChar_y - 30, 27, 10, 10, 10, 1, 10);
		//Knee
		fill(200);
		ellipse(shipChar_x + 15, shipChar_y -24, 8, 6);
		//Arms
		fill(200);
		rect(shipChar_x -7, shipChar_y - 50, 8, 27, 10, 10, 10, 2);
		//Dome
		stroke(90);
		strokeWeight(0);
		fill(75);
		rect(flagpole.x_pos + 80, flagpole.y_pos - 95, 100, 20, 20);
		strokeWeight(1);
		fill(61, 109, 146, 100);
		ellipse(flagpole.x_pos + 45, flagpole.y_pos - 115, 95, 80);
		stroke(61, 109, 146);
		strokeWeight(10);
		fill(61, 109, 146);
		triangle(flagpole.x_pos - 30, flagpole.y_pos - 145, flagpole.x_pos + 150, flagpole.y_pos - 70, flagpole.x_pos + 10, flagpole.y_pos - 70);
		//WingRight		
		stroke(0,191,255,100);
		strokeWeight(10);
		strokeJoin(ROUND);	
		fill(20);
		triangle(flagpole.x_pos - 50, flagpole.y_pos - 130, flagpole.x_pos +250, flagpole.y_pos -60, flagpole.x_pos - 25, flagpole.y_pos - 60);
		stroke(60);
		strokeWeight(1);
		strokeJoin(ROUND);
		fill(75);
		triangle(flagpole.x_pos - 30, flagpole.y_pos - 110, flagpole.x_pos +200, flagpole.y_pos -65, flagpole.x_pos - 13, flagpole.y_pos - 70);
		//Engine
		stroke(30);
		strokeWeight(1);
		fill(25);
		ellipse(flagpole.x_pos - 30, flagpole.y_pos - 68, 70, 10);
		fill(25);
		ellipse(flagpole.x_pos - 10, flagpole.y_pos - 60, 70, 10);
		//Fire	
		stroke(255,0,255,100);
		strokeWeight(10);
		fill(255,0,255,100);
		ellipse(flagpole.x_pos - 60, flagpole.y_pos - 68, 20, 5);
		fill(255,0,255,100);
		ellipse(flagpole.x_pos - 40, flagpole.y_pos - 60, 20, 5);
		//Take off
		flagpole.x_pos +=3;
		flagpole.y_pos -= 1;
		shipChar_x += 3;
		shipChar_y -=1;
	}
 	else
	{
		//LeftWing
		stroke(25);
		strokeWeight(3);
		strokeJoin(ROUND);
		fill(20);
		triangle(flagpole.x_pos - 10, flagpole.y_pos - 155, flagpole.x_pos + 280, flagpole.y_pos -80, flagpole.x_pos + 15, flagpole.y_pos - 80);
		fill(75);		
		stroke(60);
		strokeWeight(1);
		strokeJoin(ROUND);
		triangle(flagpole.x_pos + 8, flagpole.y_pos - 140, flagpole.x_pos + 230, flagpole.y_pos - 85, flagpole.x_pos + 30, flagpole.y_pos - 85);
		fill(10);
		ellipse(flagpole.x_pos + 20, flagpole.y_pos - 115, 40, 65);
		//Dome
		stroke(90);
		strokeWeight(0);
		fill(75);
		rect(flagpole.x_pos + 80, flagpole.y_pos - 95, 100, 20, 20);
		strokeWeight(1);
		fill(61, 109, 146, 100);
		ellipse(flagpole.x_pos + 45, flagpole.y_pos - 115, 95, 80);		
		stroke(61, 109, 146);
		strokeWeight(10);
		fill(61, 109, 146);
		triangle(flagpole.x_pos - 30, flagpole.y_pos - 145, flagpole.x_pos + 150, flagpole.y_pos - 70, flagpole.x_pos + 10, flagpole.y_pos - 70);
		//LandingGear
		fill(150,77,77);
		stroke(20);
		strokeWeight(2);
		triangle(flagpole.x_pos + 10, flagpole.y_pos - 62, flagpole.x_pos + 25, flagpole.y_pos - 52, flagpole.x_pos - 5, flagpole.y_pos - 52);
		triangle(flagpole.x_pos + 50, flagpole.y_pos - 62, flagpole.x_pos + 65, flagpole.y_pos - 52, flagpole.x_pos +35, flagpole.y_pos - 52);
		triangle(flagpole.x_pos + 150, flagpole.y_pos - 62, flagpole.x_pos + 165, flagpole.y_pos - 52, flagpole.x_pos +135, flagpole.y_pos - 52);
		//WingRight		
		stroke(25);
		strokeWeight(3);
		strokeJoin(ROUND);	
		fill(20);
		triangle(flagpole.x_pos - 50, flagpole.y_pos - 130, flagpole.x_pos +250, flagpole.y_pos -60, flagpole.x_pos - 25, flagpole.y_pos - 60);
		fill(75);
		triangle(flagpole.x_pos - 30, flagpole.y_pos - 110, flagpole.x_pos +200, flagpole.y_pos -65, flagpole.x_pos - 13, flagpole.y_pos - 70);
		//Engine
		stroke(30);
		strokeWeight(1);
		fill(25);
		ellipse(flagpole.x_pos - 30, flagpole.y_pos - 68, 70, 10);
		fill(25);
		ellipse(flagpole.x_pos - 10, flagpole.y_pos - 60, 70, 10);
		//Fire	
		noStroke();
		fill(30);
		ellipse(flagpole.x_pos - 60, flagpole.y_pos - 68, 20, 5);
		fill(30);
		ellipse(flagpole.x_pos - 40, flagpole.y_pos - 60, 20, 5);
	}
}

function checkFlagpole()
{
	var d = abs(gameChar_x - flagpole.x_pos);
	if(d < 15)
		flagpole.isReached = true;
}
function checkPlayerDie()
{
	for(var i = 0; i < lives; i ++)
	{	
	 noStroke()	
	 fill(250, 102, 102);
	 ellipse(200 + i * 30, 20, 20, 20);
		
	if(gameChar_y > height)
		{
			lives -= 1;
			startGame();
		}	
	}
}

function cameraMan()
{
	if(lives == 0)
		{
			gameChar_x = false;
			return;
		}
	if(flagpole.isReached)
		{
			gameChar_x = false;
			cameraPosX = flagpole.x_pos - width/2;
		}
	if(isLeft == true)
		{
			cameraPosX -=5;
		}
	if(isRight == true)
		{
			cameraPosX += 5;
		}
	translate(-cameraPosX, 0)
}
function createPlatforms(x, y, length)
{
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function(){
			fill(255,0,255, 70);
			rect(this.x, this.y, this.length, 10, 20);
		},
		checkContact: function(gc_x, gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 5)
					{
						return true;
					}
			}
			return false;
		}
	}
	return p;
}
function Enemy(x, y, range)
{
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 2;
	this.update = function()
	{
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range)
			{
				this.inc = -2;
			}
		else if(this.currentX < this.x)
			{
				this.inc = 2
			}
	}
	this.draw = function()
	{
		this.update();
		stroke(225,225,225,100);
		strokeWeight(5);
		fill(0, 0, 51, 200)
		ellipse(this.currentX, this.y, 20, 20)
		noStroke();
	}
	this.checkContact = function(gc_x, gc_y)
	{
		var d = dist(gc_x, gc_y, this.currentX, this.y)
		{
			if(d < 20)
				{   
					enemySound.play();
					ellipse(this.currentX, this.y, 1000, 1000)
					return true;
				}
			return false;
		}
	}
}
function startGame()
	{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	//Sidescroll
	cameraPosX = 0;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	//Canyons
	canyons = [canyon = {x_pos: - 400, width: 300}, canyon = {x_pos: 200, width: 100}, canyon = {x_pos: 1150, width: 200}, canyon = {x_pos: 1800, width: 150}, canyon = {x_pos: 2700, width: 100}];
	//treeArray
	treePos_y = floorPos_y;
	tree_x = [679,790,750,770,830,845,923,956,1010,1030,1200, 1400,1500,2000,2020,2040,2070,2090,2500,2200,2300,2359,2370,3000,3100,3130,3220,3310,33800,3500,3200];
	//cloudArray
	cloud = {x_pos: 230, y_pos: 150, width: 100, height: 100};
	cloud_s = [25, 300, 1000, 3000, 2500];
	//mountain array
	mountain = {x_pos: 550, y_pos: floorPos_y + -330, height: 100}
	mountain_s = [0,70, 450, 1000, 2900, 3000,3400];
	//ufoArray
	ufos = {x_pos: 800, y_pos: floorPos_y, isUnder: false};
	//collectables
	collectables = [collectable = {x_pos: 250, y_pos: floorPos_y - 100, size: 60,isFound: false}, 
	collectable = {x_pos: 400, y_pos: floorPos_y - 13, size: 60,isFound: false}, collectable = {x_pos: 900, y_pos: floorPos_y - 13, size: 60,isFound: false},
    collectable = {x_pos: 1550, y_pos: floorPos_y - 270, size: 60,isFound: false}, 
	collectable = {x_pos: 2000, y_pos: floorPos_y - 13, size: 60,isFound: false},
	collectable = {x_pos: 3200, y_pos: floorPos_y - 13, size: 60,isFound: false},
	collectable = {x_pos: 3250, y_pos: floorPos_y - 13, size: 60,isFound: false}, 
	collectable = {x_pos: 3300, y_pos: floorPos_y - 13, size: 60,isFound: false}, 
	collectable = {x_pos: 3350, y_pos: floorPos_y - 13, size: 60,isFound: false}, 
	collectable = {x_pos: 3400, y_pos: floorPos_y - 13, size: 60,isFound: false}]
	//Platforms
	platforms = [];	
	platforms.push(createPlatforms(1150, floorPos_y - 75, 150));
	platforms.push(createPlatforms(1350, floorPos_y - 150, 150));
	//Gmae Score
	game_score = 0;
	flagpole = {isReached: false, x_pos: 3700, y_pos: floorPos_y + 55};
	shipChar_y = floorPos_y-20;
	shipChar_x = 3740;
	//Enemies
	enemies = [];
	enemies.push(new Enemy(20, floorPos_y - 10, 180));
	enemies.push(new Enemy(2000, floorPos_y - 10, 300));
	}



