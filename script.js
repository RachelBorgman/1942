var score = 0;

var hero = {
    x: 300,
    y: 300
}

var enemies = [{x: 50, y:50},{x: 150, y:50},{x: 250, y:50},{x: 350, y:50},{x: 450, y:50},{x: 550, y:50},{x: 650, y:50}];

var bullets = [];

function displayHero(){
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemies(){
    var output = '';
    for (var i=0;i<enemies.length;i++){
        output += "<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>";
    }
    document.getElementById('enemies').innerHTML = output;
}

function moveEnemies(){
    for (var i=0;i<enemies.length;i++){
        enemies[i].y +=5;
        if(enemies[i].y > 540){
            enemies[i].y = 0;
            enemies[i].x = Math.random()*500;
        }
    }
}

function displayBullets(){
    var output = '';
    for (var i=0;i<bullets.length;i++){
        output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}

function moveBullets(){
    for (var i=0;i<bullets.length;i++){
        bullets[i].y -=5;
        if(bullets[i].y<0){
            bullets[i] = bullets[bullets.length-1];
            bullets.pop();
        }
    }
}

function displayScore(){
    document.getElementById('score').innerHTML = score;
}

function gameLoop(){
    displayHero();
    moveEnemies();
    displayEnemies(); 
    displayBullets();  
    moveBullets();
    displayScore();
}

function detectCollision(){
    for (var i=0;i<bullets.length;i++){
        for (var j=0;j<enemies.length;j++){
            if (Math.abs(bullets[i].x - enemies[j].x) < 5 && Math.abs(bullets[i].y - enemies[j].y) < 5){
                score += 10;
                //make enemies disappear
            }
        }
    } 
}

setInterval(gameLoop, 100);

document.onkeydown = function(a) {
    if (a.keyCode == 37){
        hero.x -= 10;
    }
    else if (a.keyCode == 39){
        hero.x +=10;
    }
    else if (a.keyCode == 40){
        hero.y +=10;
    }
    else if (a.keyCode == 38){
        hero.y -=10;
    }
    //make go up and down
    else if (a.keyCode == 32){
        bullets.push({x: hero.x+8, y: hero.y-15});
        displayBullets();
    }
    displayHero();
}

displayEnemies();