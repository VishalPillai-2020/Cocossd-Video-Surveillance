status = '';
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.parent("canvas-wrap");

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Is loaded");
    video.loop();
    video.speed(1);
    video.volume(0)
    status = true;

}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
        percentage = floor(objects[i].confidence*100);
        fill("red");
        text(objects[i].label + " "+percentage+"%", objects[i].x+15,objects[i].y+15);
        noFill() ;
        stroke("red");
        rect( objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("nod").innerHTML = " Number Of Objects Detected : "+objects.length;
        }
    }

}