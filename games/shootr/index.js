canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');
var entities = [];
var nemesis = [];
var bullets = [];
var stars = [];
counter = 0;
backgroundSpeed = 5;
baseStarSpeed = 5;
isFocused = true;
running = true;
bulletTokens = 5;

function ctxReset() {
	ctx.fillStyle = "white";
	ctx.shadowBlur = "0";
	ctx.shadowColor = "black";
}
function draw() {
	ctx.shadowBlur = 50;
	ctx.shadowColor = "white";
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
	ctx.shadowBlur = 0;
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].draw();
	}
	for (var i = 0; i < nemesis.length; i++) {
		entities[i].draw();
	}
	jet.draw();
}
setInterval(ai, 700)
function update() {
	if(running) requestAnimationFrame(update)
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < stars.length; i++) {
		stars[i].update();
	}
	for (var i = 0; i < entities.length; i++) {
		entities[i].update();
	}
	draw();
}
var jet = {
	x: 40,
	y: canvas.height/2,
	width: 40,
	height: 70,
	center: {
		x: this.x + this.width/2,
		y: this.y + this.height/2 
	},
	draw: function() {
		ctxReset();
		ctx.fillStyle = "#F2C94C";
		ctx.fillRect(this.x + this.width, this.y - this.height/4, this.width, this.height/2);
		ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
		for (var i = 0; i < bullets.length; i++) {
			if (!bullets[i].ally && collision(this, bullets[i])) {
				running = false;				
			}
		}

	}
}
class Star {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.a = 7/z;
		this.speed = baseStarSpeed/z;
		stars.push(this);
	}
	draw(){
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.a, this.a);
	}
	update(){
		this.x -= this.speed * backgroundSpeed;
		if (this.x + this.a < 0) {
			stars.splice(stars.indexOf(this), 1)
		}
		
	}

}
class JetBullet {
	constructor(x, y, ally) {
		this.width = 24;
		this.height = 24;
		this.x = x;
		this.y = y;
		this.ally = ally;
		this.speed = (ally) ? 30 : -30;
		this.fillStyle = (ally) ? "#0C0" : "#C00";
		bullets.push(this);
		entities.push(this);
	}
	draw(){
		ctx.fillStyle = this.fillStyle;
		ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
	}
	update(){
		this.x += this.speed;
		if (!(this.x >= 0 && this.x < canvas.width)) {
			entities.splice(entities.indexOf(this), 1)
			bullets.splice(bullets.indexOf(this), 1)
		}
	}
}
class Ship {
	constructor(y) {
		this.x = canvas.width + 100;
		this.y = y;
		this.width = 40;
		this.height = 70;
		this.speed = baseStarSpeed/5 * backgroundSpeed;
		this.radius = Math.random() * 50;
		this.destination = {
			x: canvas.width - 100,
			y: 600
		}
		nemesis.push(this)
		entities.push(this)
	}
	update(){
		//move to destination
		for (var i = 0; i < bullets.length; i++) {
			if (bullets[i].ally && collision(this, bullets[i])) {
				entities.splice(entities.indexOf(this), 1);
				nemesis.splice(nemesis.indexOf(this), 1);
				entities.splice(entities.indexOf(bullets[i]), 1);
				bullets.splice(bullets.indexOf(bullets[i]), 1);
			}
		}
		if (this.destination.x < this.x) {
			this.x -= distance(this, this.destination)/100;
		} 
		if (this.destination.x > this.x) {
			this.x += distance(this, this.destination)/100;
		} 
		if (this.destination.y < this.y) {
			this.y -= distance(this, this.destination)/100;
		} 
		if (this.destination.y > this.y) {
			this.y += distance(this, this.destination)/100;
		}

	}
	draw(){
		ctx.fillStyle = "black";
		ctx.strokeStyle = "white";
		ctx.fillRect(this.x - this.width, this.y - this.height/4, this.width, this.height/2);
		ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
		ctx.beginPath();
		ctx.rect(this.x - this.width, this.y - this.height/4, this.width, this.height/2);
		ctx.rect(this.x, this.y - this.height/2, this.width, this.height);
		ctx.closePath();
		ctx.stroke();
	}
}
var starGaze = setInterval(function() {
	if (isFocused) {
		new Star(canvas.width, 100 + Math.random() * (canvas.height - 100), Math.floor(1 + Math.random() * 5))
	}
}, 1000/backgroundSpeed)
window.onfocus = function() { 
	isFocused = true;
}
window.onblur = function() { 
	isFocused = false;
}
document.addEventListener("click", function(e) {
	if (bulletTokens > 0) {
		new JetBullet(50, e.clientY, true);
		--bulletTokens;
	}
});
document.addEventListener("mousemove", function(e) {
	jet.y = e.clientY;
});
for (var i = 0; i < 10; i++) {
	new Star(canvas.width * Math.random(), Math.random() * canvas.height, Math.floor(1 + Math.random() * 5))
}
/*class Coin {
	constructor(x, y) {
		
	}

	// methods
}*/
function ai() {
	for (var i = 0; i < nemesis.length; i++) {
		if (nemesis[i] instanceof Ship) {
			if (Math.random() * 100 < 40) {
				if (Math.random() * 100 < 75) {
					nemesis[i].destination.y = jet.y;
				} else {
					nemesis[i].destination.y = 100 + Math.random() * canvas.height - 100;
				}
			}
			if (Math.random() * 100 < 20) {
				nemesis[i].destination.x = canvas.width - 500 + Math.random() * 400;
			}
			if (Math.random() * 100 < 60 && jet.y - 100 < nemesis[i].y && jet.y + 100 > nemesis[i].y) {
				new JetBullet(nemesis[i].x, nemesis[i].y, false)
			}
		}
	}
	bulletTokens++;
}
setInterval(() => new Ship(Math.random() * canvas.height), 2500)
new Ship(500);
function distance(point1, point2) {
	var distX = point1.x - point2.x;
	var distY = point1.y - point2.y;
	var dist = Math.sqrt((distX * distX) + (distY * distY));
	return dist;
}
function collision(obj1, obj2) {
	if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width &&
		obj1.y + obj1.width >= obj2.y && obj1.y <= obj2.y + obj2.width) {
		return true;
	}
}

requestAnimationFrame(update)
/*
function gameover() {
	for (var i = 0; i < nemesis.length; i++) {
		if (nemesis[i].x < 0) {
			clearStuff();
			document.getElementById('game-over').style.display = 'block';
			nemesis = [];
		}
	}	
}
function win() {
	if (counter >= 10) {
		clearStuff();
		document.getElementById('tut').innerHTML = "You win!";
		document.getElementById('game-over').style.display = 'block';
	}
}
function clearStuff() {
	counter = 0;
	bullets = [];
	nemesis = [];
	window.clearInterval(updateInterval);
	window.clearInterval(spawnInterval);
}
function init() {
	document.getElementById('counter').innerHTML = 0;
	speed = 5;
	new Nemesis();
	updateInterval = setInterval(update, 20);
	spawnInterval = setInterval(spawn, 1000);
	document.getElementById('game-over').style.display = 'none';
}	
*/