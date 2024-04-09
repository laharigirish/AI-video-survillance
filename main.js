
video="";
objects=[];
function preload(){
video=createVideo("video.mp4");
video.hide();
}
function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
    
}


function start(){
    objectDetector= ml5.objectDetector ('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";

}
function modelLoaded(){
    console.log("MODEL LOADED");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
if(error)
console.log(error);
else
console.log(results);
objects= results;
}
function draw(){
    image(video,0,0,480,380);
    if(status!='')
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("no_of_objects").innerHTML="Number of Objects Detected are:"+ objects.length;
            fill("#f21111");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + " "+ percent+ "%"+ objects[i].x +15, objects[i].y + 15);
            noFill();
            stroke("#f21111");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

    }
}}