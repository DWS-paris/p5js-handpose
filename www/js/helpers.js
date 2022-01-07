/* 
    Function to extract hand points
    @params{array} handposePrediction: array of prediction from handpose
    @params{[string]} parts: list of finger part to return
*/
    function extractHandPoints(handposePrediction, ...parts){
        // Set tmp value
        let pointCollection = [];
        let predictionConfidence = 0;

        // Loop on prediction
        for (let i = 0; i < handposePrediction.length; i += 1) {
            // Bind prediction
            const prediction = handposePrediction[i];

            // Get confidence score
            predictionConfidence = prediction.handInViewConfidence;

            // Loop on prediction to get fingers
            for( prop in prediction.annotations ){
                // Select fingers from param
                if(parts.indexOf(prop) !== -1){
                    // Bind annotations
                    const annotations = prediction.annotations[prop];

                    // Loop on figuer to get points
                    for (let i = 0; i < annotations.length; i += 1){
                        // Push point in returned collection
                        pointCollection.push({
                            x: annotations[i][0],
                            y: annotations[i][1],
                            part: prop,
                            index: i,
                        });
                    };
                };
            };
        };

        // Retun array of values
        return [ pointCollection, predictionConfidence ];
    }
//


/* 
    Function to define random value
    @params{number} min: first step
    @params{number} max: last step
    @params{boolean} floor: option to set floor
*/
    function randomize(min, max, floor = false){
        // Define random value
        const rando = Math.random() * max;

        // Return random
        if(!floor){ return rando + min }
        else{ return Math.floor( rando + min ) };
    }
//