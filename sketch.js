//Patch 1.1 - Added Collision with sides of paddles
//Patch 1.2 - Fixed issues from Patch 1.1 - IT'S NOT A BUG, IT'S A FEATURE
//Patch 1.3 - Changes to the Collision System added in 1.1
//Patch 1.4 - Increased Ball Speed
//Patch 1.5 - Lowered Paddle Speed
//Patch 1.6 - Added Patch notes in beginning of file
//Patch 1.7 - Changed Victory Screen and Added List of Expected Changes in future Patch
//Patch 1.8 - Fixed Issue with Victory Condition and added instructions for playing
//Ptach 1.9 - Added IMPOSSIBLE MODE - PRESS CTRL TO ACTIVATE
//Patch 1.10 - Fixed Issue When the Ball Hit the Side of a Paddle it Would Get Stuck in the Paddle
//Patch 1.11 - Added a way to Restart the Game at all Times and Changed Paddle Design7
//Patch 1.12 - Increased Play Area
//Patch 2.0 - Added Single Player Mode
//Patch 2.1 - Reduced Play Area due to Problems on Smaller Screens, Fixed Issue Where Game Would Freeze When Player Lost Single Player Mode and Fixed Issue When Ball Hit Side of Paddle + Small Tweaks to Gameplay
//Patch 2.2 - The Game Now Gets Easier If You Suck at Single Player
//Patch 2.3 - FINALLY FIXED THE MUSIC
//Patch 2.4 - Changed Paddle Collision system
//Background Music - MEGALOVANIA By Toby Fox


let speedArrayX = [-8, 8];
let speedArrayY1 = [-1, 0, 1];
let speedArrayY2 = [-3, -2, 2, 3];
let speedArrayY3 = [-6, -5, -4, 4, 5, 6];
let speedArrayY4 = [-8, -7, 7, 8];
let speedArrayY = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
let IMA = [-25, 25];
let singlePlayer = false;
let multiPlayer = false;
let pad1pos = 400;
let pad2pos = 400;
let pad1x = 24;
let pad2x = 976;
let downPress1 = false;
let upPress1 = false;
let downPress2 = false;
let upPress2 = false;
let score1 = 0;
let score2 = 0;
let scx = 0;
let scy = 0;
let bcolour = 'white';
let padw = 24;
let padh = 100;
// let buttonsp;
// let buttonmp;
// let mpb;
// let spb;
// let buttonpa;

function preload() {
  bounceSound = loadSound('bounce_sound.ogg');
  paddleBounce = loadSound('paddle_bounce_sound.ogg');
  //victorySound1 = loadSound('victory_sound.mp3');
  //victorySound2 = loadSound('victorycandidate.mp3');
  SoundTrack = loadSound('SOUNDTRACK.mp3');
}

function setup() {
  createCanvas(800, 500);
  paddleBounce.setVolume(0.3);
  SoundTrack.setVolume(0.1);
  if (SoundTrack.isLoaded()) {
    SoundTrack.play();
    SoundTrack.loop();
  }
  // buttonmp = createButton('MultiPlayer');
  // buttonsp = createButton('Single Player');
  // mpb = createButton('Play MultiPlayer');
  // spb = createButton('Play SinglePlayer')
  //createElement('h1','Press SpaceBar to play');
  //buttonpa = createButton('Play again?');
}

function draw() {
  //frameRate(5);
  //buttonsp.mouseClicked();

  if (multiPlayer === false && singlePlayer === false && score1 === 0 && score2 === 0) {
    background(255);
    textSize(30);
    textAlign(CENTER);
    fill(0);
    text('PONG', width / 2, height / 2 - 150)
    text('Press Left Arrow for Multi Player', width / 2, height / 2 - 50);
    text(' Press Right Arrow for Single Player', width / 2, height / 2 + 50)
  }

  if (multiPlayer) {
    background(15);
    //SoundTrack.setVolume(0.1);
    // if (SoundTrack.isLoaded()) {
    //   SoundTrack.play();
    // }
    circle.x = circle.x + scx;
    circle.y = circle.y + scy;
    strokeWeight(0.5);
    stroke(255);
    line(width / 2, 0, width / 2, height);
    paddle1();
    paddle2();
    ball();
    score1Text();
    score2Text();
    colwp1();
    colwp2();
    colwf();
    colwr();
    sufp1();
    sufp2();
    col1();
    col2();
    if (score1 >= 11) {
      background(0);
      multiPlayer = false;
      player1Win();
      //victorySound2.play();
      // buttonpa.position(360, 300);
      // buttonpa.mouseClicked(playAgain());
    }
    if (score2 >= 11) {
      background(0);
      multiPlayer = false;
      player2Win();
      //victorySound.play();
      // buttonpa.position(360, 300);
      // buttonpa.mouseClicked(playAgain());
    }
    if (scx === 0 && scy === 0 && score1 === 0 && score2 === 0) {
      textAlign(CENTER);
      textSize(28);
      text('This is MultiPlayer', width / 2, height / 2 - 80);
      text('Press SpaceBar to Play', width / 2, height / 2 - 50);
      textSize(10);
      text('Also, press SpaceBar while playing to make your life harder', width / 2, height / 2 + 150);
      text('Press Ctrl while playing to make the game almost impossible', width / 2, height / 2 + 170);
      textSize(23);
      textAlign(LEFT);
      fill(220, 0, 0);
      text('Control Red with "W" and "S"', 0, 50);
      textAlign(RIGHT);
      fill(0, 0, 200);
      text('Control Blue with Arrow Up and Arrow Down', width, 50);
    }
  }

  if (singlePlayer) {
    background(15);
    //SoundTrack.setVolume(0.1);
    // if (SoundTrack.isLoaded()) {
    //   SoundTrack.play();
    // }
    circle.x = circle.x + scx;
    circle.y = circle.y + scy;
    strokeWeight(0.5);
    stroke(255);
    line(width / 2, 0, width / 2, height);
    sPlayer();
    aipaddle();
    paddle2();
    ball();
    score1Text();
    score2Text();
    colwp1();
    colwp2();
    colwf();
    colwr();
    sufp1();
    sufp2();
    col1();
    col2();
    if (score1 >= 11) {
      background(0);
      singlePlayer = false;
      playerLose();
      //victorySound2.play();
      // buttonpa.position(360, 300);
      // buttonpa.mouseClicked(playAgain());
    }
    if (score2 >= 11) {
      background(0);
      singlePlayer = false;
      playerWin();
      //victorySound.play();
      // buttonpa.position(360, 300);
      // buttonpa.mouseClicked(playAgain());
    }
    if (scx === 0 && scy === 0 && score1 === 0 && score2 === 0) {
      textAlign(CENTER);
      textSize(28);
      text('This is Single Player', width / 2, height / 2 - 80);
      text('Press SpaceBar to Play', width / 2, height / 2 - 50);
      textSize(10);
      text('Also, press SpaceBar while playing to make your life harder', width / 2, height / 2 + 150);
      text('Press Ctrl while playing to make the game almost impossible', width / 2, height / 2 + 170);
      textSize(23);
      textAlign(RIGHT);
      fill(0, 0, 200);
      text('Control Blue with Arrow Up and Arrow Down', width, 50);
    }
  }

}

function paddle1() {
  rectMode(CENTER);
  fill(220, 0, 0);
  noStroke();
  rect(12, pad1pos, padw, padh, 20);

  if (downPress1 && pad1pos < height - 50) {
    pad1pos += 5
  }
  if (upPress1 && pad1pos > 50) {
    pad1pos += -5
  }

}

function paddle2() {
  rectMode(CENTER);
  fill(0, 0, 200);
  noStroke();
  rect(788, pad2pos, padw, padh, 20);

  if (downPress2 && pad2pos < height - padh / 2) {
    pad2pos += 5
  }
  if (upPress2 && pad2pos > padh / 2) {
    pad2pos += -5
  }

}

function aipaddle() {
  rectMode(CENTER);
  fill(220, 0, 0);
  noStroke();
  rect(12, pad1pos, padw, padh, 20);
}

const circle = {
  x: 350,
  y: 250,
  radius: 27
}

function ball() {
  fill(bcolour);
  noStroke();
  ellipse(circle.x, circle.y, circle.radius);
}

function keyPressed() {
  if (key === 'ArrowUp') {
    upPress2 = true
  }
  if (key === 'ArrowDown') {
    downPress2 = true
  }
  if (keyCode === 87) {
    upPress1 = true
  }
  if (keyCode === 83) {
    downPress1 = true
  }
}

function keyReleased(value) {
  if (value.key === 'ArrowUp') {
    upPress2 = false
  }
  if (value.key === 'ArrowDown') {
    downPress2 = false
  }
  if (value.keyCode === 87) {
    upPress1 = false
  }
  if (value.keyCode === 83) {
    downPress1 = false
  }
  if (value.keyCode === 32) {
    bcolour = 'white';
    scx = random(speedArrayX);
    scy = random(-8, 8);
  }
  if (value.keyCode === 17) {
    bcolour = (10);
    scx = random(IMA);
    scy = random(IMA);
  }
  if (value.keyCode === 39 && singlePlayer === false && multiPlayer === false) {
    score1 = 0;
    score2 = 0;
    bcolour = 'white';
    scx = 0;
    scy = 0;
    singlePlayer = true
    pad1pos = height / 2;
    pad2pos = height / 2;
    circle.x = width / 2;
    circle.y = height / 2;
  }
  if (value.keyCode === 39 && singlePlayer === false && multiPlayer === true) {
    score1 = 0;
    score2 = 0;
    bcolour = 'white';
    scx = 0;
    scy = 0;
    multiPlayer = false;
    singlePlayer = true;
    pad1pos = height / 2;
    pad2pos = height / 2;
    circle.x = width / 2;
    circle.y = height / 2;
  }
  if (value.keyCode === 37 && multiPlayer === false && singlePlayer === false) {
    score1 = 0;
    score2 = 0;
    bcolour = 'white';
    scx = 0;
    scy = 0;
    multiPlayer = true;
    pad1pos = height / 2;
    pad2pos = height / 2;
    circle.x = width / 2;
    circle.y = height / 2;
  }
  if (value.keyCode === 37 && multiPlayer === false && singlePlayer === true) {
    score1 = 0;
    score2 = 0;
    bcolour = 'white';
    scx = 0;
    scy = 0;
    singlePlayer = false;
    multiPlayer = true;
    pad1pos = height / 2;
    pad2pos = height / 2;
    circle.x = width / 2;
    circle.y = height / 2;
  }
  if (value.keyCode === 27) {
    background(255);
    multiPlayer = false;
    singlePlayer = false;
    score1 = 0;
    score2 = 0;
  }
  // if (value.keyCode === 77 && SoundTrack.isPlaying()) {
  //   SoundTrack.pause();
  // }
  // if (value.keyCode === 77 && SoundTrack.isPaused()) {
  //   SoundTrack.play();
  //   SoundTrack.playMode('restart');
  // }

}

function colwp1() {
  if (circle.x === 24) {
    if (circle.y > pad1pos - 15 && circle.y < pad1pos + 15) {
      scx *= -1;
      scy = random(speedArrayY1);
      paddleBounce.play();
    }
    if (circle.y > pad1pos - 25 && circle.y <= pad1pos - 15) {
      scx *= -1;
      scy = random(speedArrayY2);
      paddleBounce.play();
    }
    if (circle.y < pad1pos + 25 && circle.y >= pad1pos + 15) {
      scx *= -1;
      scy = random(speedArrayY2);
      paddleBounce.play();
    }
    if (circle.y < pad1pos + 35 && circle.y >= pad1pos + 25) {
      scx *= -1;
      scy = random(speedArrayY3);
      paddleBounce.play();
    }
    if (circle.y > pad1pos - 35 && circle.y <= pad1pos - 25) {
      scx *= -1;
      scy = random(speedArrayY3);
      paddleBounce.play();
    }
    if (circle.y < pad1pos + 50 && circle.y >= pad1pos + 35) {
      scx *= -1;
      scy = random(speedArrayY4);
      paddleBounce.play();
    }
    if (circle.y > pad1pos - 50 && circle.y <= pad1pos - 35) {
      scx *= -1;
      scy = random(speedArrayY4);
      paddleBounce.play();
    }
  }
}

function colwp2() {
  if (circle.x === width - 24) {
    if (circle.y > pad2pos - 15 && circle.y < pad2pos + 15) {
      scx *= -1;
      scy = random(speedArrayY1);
      paddleBounce.play();
    }
    if (circle.y > pad2pos - 25 && circle.y <= pad2pos - 15) {
      scx *= -1;
      scy = random(speedArrayY2);
      paddleBounce.play();
    }
    if (circle.y < pad2pos + 25 && circle.y >= pad2pos + 15) {
      scx *= -1;
      scy = random(speedArrayY2);
      paddleBounce.play();
    }
    if (circle.y < pad2pos + 35 && circle.y >= pad2pos + 25) {
      scx *= -1;
      scy = random(speedArrayY3);
      paddleBounce.play();
    }
    if (circle.y > pad2pos - 35 && circle.y <= pad2pos - 25) {
      scx *= -1;
      scy = random(speedArrayY3);
      paddleBounce.play();
    }
    if (circle.y < pad2pos + 50 && circle.y >= pad2pos + 35) {
      scx *= -1;
      scy = random(speedArrayY4);
      paddleBounce.play();
    }
    if (circle.y > pad2pos - 50 && circle.y <= pad2pos - 35) {
      scx *= -1;
      scy = random(speedArrayY4);
      paddleBounce.play();
    }
  }

}

function colwf() {
  if (circle.y > height - circle.radius / 2) {
    scy *= -1;
    bounceSound.play();
  }
}

function colwr() {
  if (circle.y < 13.5) {
    scy *= -1;
    bounceSound.play();
  }
}

function col1() {
  if (circle.x < 24 && circle.y > pad1pos - 50 && circle.y < pad1pos + 50) {
    scy *= -1;
    paddleBounce.play();
  }
}

function col2() {
  if (circle.x > width - 24 && circle.y > pad2pos - 50 && circle.y < pad2pos + 50) {
    scy *= -1;
    paddleBounce.play();
  }
}

function sufp1() {
  if (circle.x > width) {
    pad1pos = height / 2;
    pad2pos = height / 2;
    score1++;
    //game = false;
    circle.x = width / 2;
    circle.y = height / 2;
    scx *= 0;
    scy *= 0;
  }
}

function sufp2() {
  if (circle.x < 0) {
    pad1pos = height / 2;
    pad2pos = height / 2;
    score2++;
    //game = false;
    circle.x = width / 2;
    circle.y = height / 2;
    scx *= 0;
    scy *= 0;
  }
}

function score1Text() {
  fill(255);
  textAlign(LEFT);
  noStroke();
  textFont('Arial');
  textSize(23);
  text('Score: ' + score1, 0, 20);
}

function score2Text() {
  fill(255);
  textAlign(RIGHT);
  noStroke();
  textFont('Arial');
  textSize(23);
  text('Score: ' + score2, width, 20);
}

function player1Win() {
  stroke('red');
  fill('red');
  textAlign(CENTER);
  noStroke(255, 0, 0);
  textFont('Arial');
  textSize(40);
  text('Player Red won!', width / 2, height / 2);
  fill('white');
  textSize(20);
  text('Press Right Arrow for Single Player and Left Arrow for MultiPlayer', width / 2, height / 2 + 50);
  text('Press Esc to go Close the Game', width / 2, height / 2 + 100);
}

function player2Win() {
  stroke('blue');
  fill('blue');
  textAlign(CENTER);
  noStroke(0, 0, 255);
  textFont('Arial');
  textSize(40);
  text('Player Blue won!', width / 2, height / 2);
  fill('white');
  textSize(20);
  text('Press Right Arrow for Single Player and Left Arrow for MultiPlayer', width / 2, height / 2 + 50);
  text('Press Esc to go Close the Game', width / 2, height / 2 + 100);
}

function playerWin() {
  stroke('blue');
  fill('blue');
  textAlign(CENTER);
  noStroke(0, 0, 255);
  textFont('Arial');
  textSize(40);
  text('You won!', width / 2, height / 2);
  fill('white');
  textSize(20);
  text('Press Right Arrow for Single Player and Left Arrow for MultiPlayer', width / 2, height / 2 + 50);
  text('Press Esc to go Close the Game', width / 2, height / 2 + 100);
}

function playerLose() {
  stroke('red');
  fill('red');
  textAlign(CENTER);
  noStroke(0, 0, 255);
  textFont('Arial');
  textSize(40);
  text('You lost!', width / 2, height / 2);
  fill('white');
  textSize(20);
  text('Press Right Arrow for Single Player and Left Arrow for MultiPlayer', width / 2, height / 2 + 50);
  text('Press Esc to go Close the Game', width / 2, height / 2 + 100);
}

function sPlayer() {
  if (score1 - score2 <= 4) {
    if (pad1pos <= height - 50) {
      pad1pos = pad1pos + (scy * (6.2 / 16));
    } else {
      pad1pos = height - 50
    }
    if (pad1pos >= 50) {
      pad1pos = pad1pos + (scy * (6.2 / 16))
    } else {
      pad1pos = 50
    }
  } else {
    if (pad1pos <= height - 50) {
      pad1pos = pad1pos + (scy * (5.8 / 16));
    } else {
      pad1pos = height - 50
    }
    if (pad1pos >= 50) {
      pad1pos = pad1pos + (scy * (5.8 / 16))
    } else {
      pad1pos = 50
    }
  }
  if (score1 - score2 >= 8) {
    if (pad1pos <= height - 50) {
      pad1pos = pad1pos + (scy * (5 / 16));
    } else {
      pad1pos = height - 50
    }
    if (pad1pos >= 50) {
      pad1pos = pad1pos + (scy * (5 / 16))
    } else {
      pad1pos = 50
    }
  }
}