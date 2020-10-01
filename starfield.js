/**
 * Basic starfield background
 * Mainly for me to play around with basic js
 * TODO - Why is it not showing with fullpage?
*/

// TODO - Change between starfield and snowfield based off date.
class BackgroundStarfield {
	constructor() {
		this.fps = 30;
		this.canvas = null;
		this.width = 0;
		this.height = 0;
		this.minimumVelocity = 15;
		this.maximumVelocity = 30;
		this.stars = 100;
        this.interval = 0;
        this.currDate = new Date()
        this.useSnowField = true;

        if ((this.currDate.getMonth() > 5 && this.currDate.getMonth() < 11) ||
            (this.currDate.getMonth() === 5 && this.currDate.getDate() >= 21) ||
            (this.currDate.getMonth() === 11 && this.currDate.getDate() < 21)) {
                this.useSnowField = false;
        }
	}

    
	init(div) {
		var self = this;
		this.containerDiv = div;
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		window.addEventListener('resize', function resize(event) {
			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.canvas.width = self.width;
			self.canvas.height = self.height;
			self.draw();
		});

		//	Create the canvas.
		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		this.canvas = canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	begin() {
		//	Create the stars.
		var stars = [];
		for (var i = 0; i < this.stars; i++) {
			stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1,
		 		(Math.random() * (this.maximumVelocity - this.minimumVelocity)) + this.minimumVelocity);
		}
		this.stars = stars;

		var self = this;
		//	Start the timer.
		this.interval = setInterval(function() {
			self.update();
			self.draw();	
		}, 1000 / this.fps);
	}

	end() {
		clearInterval(this.interval);
	}

	update() {
		var dt = 1 / this.fps;

		for(var i = 0; i < this.stars.length; i++) {
			var star = this.stars[i];
			star.y += dt * star.velocity;
			//	If the star has moved from the bottom of the screen, spawn it at the top.
			if (star.y > this.height) {
				this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, 
				(Math.random() * (this.maximumVelocity - this.minimumVelocity)) + this.minimumVelocity);
			}
		}
	}

	draw() {
		//	Get the drawing context.
		var context = this.canvas.getContext("2d");

		//	Draw the background.
	 	context.fillStyle = '#e3e3e3';
		context.fillRect(0, 0, this.width, this.height);

		//	Draw  the stars.
		context.fillStyle = '#000000';
		for(var i = 0; i < this.stars.length; i++) {
			var star = this.stars[i];
			context.fillRect(star.x, star.y, star.size, star.size);
		}
	}

}

class Star {
	constructor(x, y, size, velocity) {
		this.x = x;
		this.y = y; 
		this.size = size;
		this.velocity = velocity;
	}
}