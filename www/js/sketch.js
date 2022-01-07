/* 
    P5.js logic: main declaration
    To use variables in a P5.js project, you need to declare them
    at the top of your Javascript document, and add value to them
    within the preload() function.
*/
    // Video sizing
    let videoWidth = null;
    let videoHeigth = null;
    let ratioX = null;
    let ratioY = null;

    // ML5.js
    let ml5Handpose = null;
    let ml5HandposePrediction = null;
    let ml5VideoHandeler = null;

    // Hand variables
    let hand = null;
    let handpoints = null;
    let handPointCollection = null;
    let handPredictionConfidence = null;

    let isDrawing = null;
    let colors = null;
    let backgroundColor = null;

    let collision = null;
    let particulePosition = null;


    let hexagon = undefined
    let debug = true
//

/* 
    P5.js specific: preload() function
    Called directly before setup(), the preload() function is used 
    to handle asynchronous loading of external files in a blocking way. 
    => https://p5js.org/reference/#/p5/preload
*/
    function preload() {
        // Define video size
        videoWidth = 640;
        videoHeigth = 480;

        // Define ration to get fullscreen video
        ratioX = window.innerWidth / videoWidth;
        ratioY = window.innerHeight / videoHeigth;

        // Prepare utils
        ml5HandposePrediction = [];
        hexagon = [];
        isDrawing = false;
        particulePosition = undefined;
        colors = [
            'rgba(0, 0, 0, 1)', // black
            'rgba(4, 0, 152, 1)', // Blue
            'rgba(38, 239, 129, 1)', // green
            'rgba(0, 0, 0, 0.3)', // grey
            'rgba(239, 123, 48, 1)', // orange
            'rgba(255, 52, 154, 1)', // pink
            'rgba(205, 43, 159, 1)', // purple
            'rgba(231, 239, 48, 1)', // yellow
        ];
        backgroundColor = colors[randomize(0, colors.length, true)];
    };
//

/* 
    P5.js specific: setup() function
    The setup() function is called once when the program starts. 
    It's used to define initial environment properties.
    => https://p5js.org/reference/#/p5/setup
*/
    function setup() {
        /* 
            Create a canvas element in the document
            => https://p5js.org/reference/#/p5/createCanvas
        */
            createCanvas(640 * ratioX, 480 * ratioY);
        //
        
        /* 
            Create ML5.js video handeler for prediction
            => https://p5js.org/reference/#/p5/createCapture
        */
            ml5VideoHandeler = createCapture(VIDEO);
            ml5VideoHandeler.size(width, height);
        //

        /* 
        ML5.js: Handpose configuration
        => https://learn.ml5js.org/#/reference/handpose
        */
            // Load Handpose model
            ml5Handpose = ml5.handpose(ml5VideoHandeler, function(){ 
                // Change header info
                document.querySelector('#header-info').innerText = `Pinche your fingers in front of your webam to paint`;
            });

            // Bind Handpose event to save prediction
            ml5Handpose.on(`predict`, results => ml5HandposePrediction = results);
        //

        // Create hand
        hand = new Hand(ratioX, ratioY);

        // Hide video to draw
        ml5VideoHandeler.hide();
    }
//

/* 
    P5.js specific: draw() function
    The draw() function is called juste after the setup function.
    It should always be controlled with noLoop(), redraw() and loop().
    => https://p5js.org/reference/#/p5/draw
*/
    function draw() {
        if(ml5Handpose){
            // Get hand point collection
            getHandPoints();
            
            // Check hand point collection and prediction confidence
            if(handPointCollection && handPredictionConfidence){
                // Check confidence
                if(handPredictionConfidence > 0.98){
                    // Move hand
                    hand.move(handPointCollection);
                    hand.display();

                    // Check for collision
                    if(hand.collision){
                        // Save collision
                        collision = hand.collision.touched.part;

                        // Start drawing particles
                        isDrawing = true;
                        particulePosition = hand.collision.touch.position
                    }
                }
            }
            
            // Check if drawing to generate particles
            if( isDrawing ){
                generateParticles();
            }
        }
    }
//

function getHandPoints() {
    // Check prediction size
    if(ml5HandposePrediction.length > 0){
        // Extract values
        [ handPointCollection, handPredictionConfidence ] = extractHandPoints(
            ml5HandposePrediction, 
            'thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky', 'palmBase'
        );
    }
}

function generateParticles() {
    // Great 10 iterations
    for( let i = 0; i < 11; i++ ){
        // Set tmp shape variables
        let shapeType = null
        const shapes = ['circle', 'rect', 'star', 'polygon'];

        // Define shape type
        if(collision === 'indexFinger'){ shapeType = shapes[randomize(0, shapes.length, true)]}
        else if(collision === 'middleFinger'){ shapeType = 'circle'}
        else if(collision === 'ringFinger'){ shapeType = 'star'}
        else if(collision === 'pinky'){ shapeType = 'polygon'}
        
        // Check if shape type is defined
        if(shapeType){
            // Generate and display generative partivles
            const newGenerativeParticles = new GenerativeParticles( 
                particulePosition.x, 
                particulePosition.y,
                shapeType
            )
            newGenerativeParticles.draw();
        };
    }

    // Reset drawing
    isDrawing = false;
}
