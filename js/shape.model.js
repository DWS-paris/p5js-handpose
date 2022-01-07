/* 
    Class to define hand
*/
    class Hand {
        constructor(ratioX, ratioY) {
            // Get ration from main sketch
            this.ratioX = ratioX;
            this.ratioY = ratioY;

            // Set class fingers
            this.fingers = null;
            
            this.fingerPoints = null;
            this.collision = null;

            this.thumb = null;
            this.indexFinger = null;
            this.middleFinger = null;
            this.ringFinger = null;
            this.pinky = null;
            this.palmBase = null;

            // bounce
            this.bounceBox = null;
        }

        getBounce(){
            let x = [100000, 0];
            let y = [100000, 0];

            for( let point of this.fingerPoints ){
                if( point.position.x < x[0] ){ x[0] = point.position.x }
                else if( point.position.x > x[1] ){ x[1] = point.position.x }
                
                if( point.position.y < y[0] ){ y[0] = point.position.y }
                else if( point.position.y > y[1] ){ y[1] = point.position.y }
            }

            // Create vertex => https://p5js.org/reference/#/p5/vertex
            beginShape();
                /* noStroke();
                fill('rgba(255, 255, 255, 0.1)');

                vertex(x[0], y[0]);
                vertex(x[1], y[0]);
                vertex(x[1], y[1]);
                vertex(x[0], y[1]); */
                
            endShape(CLOSE); // CLOSE param is used to finish the hezagon
        }

        move(ml5HandposePrediction) {
            // Reset fingers
            this.fingerPoints = [];

            this.thumb = [];
            this.indexFinger = [];
            this.middleFinger = [];
            this.ringFinger = [];
            this.pinky = [];
            this.palmBase = [];

            // Sort array
            //ml5HandposePrediction.sort(function(a, b) { return a.y - b.y; });

            // Loop on array to get finger points
            for( let finger of ml5HandposePrediction.sort(function(a, b) { return b.y - a.y; }) ){
                // Switch finger to set point positions
                // new Circle(finger, 'rgba(239, 123, 48, 0.9)')
                this.fingerPoints.push(
                    new Circle(
                        {
                            x: finger.x * this.ratioX,
                            y: finger.y * this.ratioY,
                            index: finger.index,
                            size: 20 + (finger.index * 9),
                            part: finger.part,

                        }, 
                        'rgba(239, 123, 48, 0.9)'
                    )
                )
            }

            // Contact fingers
            this.fingers = [ 
                ...this.thumb,
                ...this.indexFinger,
                ...this.middleFinger,
                ...this.ringFinger,
                ...this.pinky,
                ...this.palmBase
            ];
        }

        display(){
            //this.fingerPoints
            for( let point of this.fingerPoints ){
                if( ['thumb'].indexOf(point.part) !== -1 ){
                    this.collision = point.checkColision(this.fingerPoints);
                }
                //point.display();
            }
        }
    }
//


/* 
    Class to define Circle
*/
    class Circle {
        constructor(item, fillColor) {
            this.part = item.part;
            this.position = new p5.Vector(item.x, item.y);
            this.size = item.size;
            this.index = item.index;
            this.fillColor = fillColor;
        }

        checkColision(balls){
            if(this.index === 3){
                for( let touched of balls ){
                    if(touched.index === 3 && touched.part !== this.part){
                        // Get distances between the balls components
                        let distanceVect = p5.Vector.sub(touched.position, this.position);

                        // Calculate magnitude of the vector separating the balls
                        let distanceVectMag = distanceVect.mag();

                        // Minimum distance before they are touching
                        let minDistance = this.size + touched.size;

                        if (distanceVectMag < minDistance && touched.part){
                            //console.log(`${this.part} been touched by ${touched.part}`)
                            this.fillColor = 'rgba(196, 56, 56, 1)';
                            touched.fillColor = 'rgba(196, 56, 56, 1)';

                            return { touched, touch: this }
                        }
                        else{ return null }
                    }
                }
            }
        }

        display() {
            noStroke();
            fill(this.fillColor);
            ellipse(this.position.x, this.position.y, this.size * 2, this.size * 2);
            
            // Check index
            if(this.index){
                push();
                    textSize(32);
                    fill(0, 102, 153);
                    text(this.index, this.position.x, this.position.y);
                pop();
            }
        }
    }
//

/* 
    Class to define Rect
*/
    class Rect {
        constructor(item, fillColor) {
            this.position = new p5.Vector(item.x, item.y);
            this.size = item.size;
            this.fillColor = fillColor;
        }

        display() {
            noStroke();
            fill(this.fillColor);
            /* ellipse(this.position.x, this.position.y, this.size * 2, this.size * 2); */
            rect(this.position.x, this.position.y, this.size * 2, this.size * 2);
        }
    }
//

/* 
    Class to define Star
*/
    class Star {
        constructor(item, fillColor) {
            this.position = new p5.Vector(item.x, item.y);
            this.radius1 = item.size / 3;
            this.radius2 = item.size;
            this.npoints = item.npoints;
            this.fillColor = fillColor;
        }

        display() {
            noStroke();
            fill(this.fillColor);
            
            let angle = TWO_PI / this.npoints;
            let halfAngle = angle / 2.0;

            beginShape();
            for (let i = 0; i < TWO_PI; i += angle) {
                let sx = this.position.x + cos(i) * this.radius2;
                let sy = this.position.y + sin(i) * this.radius2;
                vertex(sx, sy);
                sx = this.position.x + cos(i + halfAngle) * this.radius1;
                sy = this.position.y + sin(i + halfAngle) * this.radius1;
                vertex(sx, sy);
            }
            endShape(CLOSE);
        }
    }
//

/* 
    Class to define Polygon
*/
    class Polygon {
        constructor(item, fillColor) {
            this.position = new p5.Vector(item.x, item.y);
            this.radius = item.size;
            this.npoints = item.npoints;
            this.fillColor = fillColor;
        }

        display() {
            noStroke();
            fill(this.fillColor);
            
            let angle = TWO_PI / this.npoints;
            beginShape();
            for (let i = 0; i < TWO_PI; i += angle) {
                let sx = this.position.x + cos(i) * this.radius;
                let sy = this.position.y + sin(i) * this.radius;
                vertex(sx, sy);
            }
            endShape(CLOSE);
        }
    }
//


/* 
    Generative Particles
*/
    class GenerativeParticles {
        constructor(x, y, shapeType){
            // Set position
            this.x = x;
            this.y = y;
            this.mouveX = Math.random() * 4 - 2;
            this.mouveY = Math.random() * 4 - 2;

            // Set size
            this.sizeMax = randomize(2, 4, true);
            this.size = Math.random() * 1 + 2;
            this.sizeVelocity = Math.random() * 0.1 + 0.05;
            
            // Set movement properties
            this.xAngle = Math.random() * 6.2; // eq. 360°
            this.xAngleVelocity = Math.random() * 0.6 - 0.3;
            this.yAngle = Math.random() * 6.2; // eq. 360°
            this.yAngleVelocity = Math.random() * 0.6 - 0.3;

            // Set shape type
            this.shapeType = shapeType

            // Define color
            this.rgbColor = `${randomize(0, 255, true)}, ${randomize(0, 255, true)}, ${randomize(0, 255, true)}`
            this.lightness = 0.1;
        }

        draw(){
            // Get circle position and size
            this.x += this.mouveX + Math.sin(this.xAngle);
            this.y += this.mouveY + Math.sin(this.yAngle);
            this.size += this.sizeVelocity;

            // Increase angles by velocity (define the movement)
            this.xAngle += this.xAngleVelocity;
            this.yAngle += this.yAngleVelocity;

            // Increase color lightnes
            if( this.lightness < 1){ this.lightness += 0.1 }

            // Check circle size
            if( this.size < this.sizeMax ){
                // Create tmp value
                let newShape = undefined;

                // Randomize shape
                if( this.shapeType === 'circle' ){
                    newShape = new Circle(
                        {
                            x: this.x,
                            y: this.y,
                            size: this.size,
    
                        }, 
                        `rgba(${this.rgbColor}, ${this.lightness})`
                    );
                }
                else if( this.shapeType === 'rect' ){
                    newShape = new Rect(
                        {
                            x: this.x,
                            y: this.y,
                            size: this.size,
    
                        }, 
                        `rgba(${this.rgbColor}, ${this.lightness})`
                    );
                }
                else if( this.shapeType === 'star' ){
                    newShape = new Star(
                        {
                            x: this.x,
                            y: this.y,
                            size: this.size * 3,
                            npoints: randomize(3, 5, true)
    
                        }, 
                        `rgba(${this.rgbColor}, ${this.lightness})`
                    );
                }
                else if( this.shapeType === 'polygon' ){
                    newShape = new Polygon(
                        {
                            x: this.x,
                            y: this.y,
                            size: this.size * 3,
                            npoints: randomize(3, 10, true)
    
                        }, 
                        `rgba(${this.rgbColor}, ${this.lightness})`
                    );
                }

                // Check if shape in defined
                if(newShape){
                    // Call display method on shape object
                    newShape.display();
                    
                    // Inner draw loop
                    requestAnimationFrame(this.draw.bind(this));
                }
            }
        }
    }
//  