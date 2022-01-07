/* 
Main declaration
*/
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let video;
    let poseNet;
//



/* 
P5.js setup: called once when the program starts
=> https://p5js.org/reference/#/p5/setup
*/
    function setup() {
        /* 
        Create a canvas element in the document
        => https://p5js.org/reference/#/p5/createCanvas
        */
            createCanvas(windowWidth, windowHeight);
        //

        /* 
        Bind webcam
        */
            webcam = createCapture(VIDEO);
            webcam.size(width, height);
        //

        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPose);

        webcam.hide();
    }



/* 
P5.js draw: called continuously (loop)
=> https://p5js.org/reference/#/p5/draw
*/
    function draw() {
        // Set cavas definition
        background(220);

        /* 
        Draw image with webcam
        => https://p5js.org/reference/#/p5/image
        */
        image(webcam, 0, 0);
    }   
//


/* 
ML5.js
*/
    // When the model is loaded
    function modelLoaded() {
        console.log('Model Loaded!', poseNet);
    }

    function gotPose(pose) {
        console.log('gotPose', pose);
    }
//