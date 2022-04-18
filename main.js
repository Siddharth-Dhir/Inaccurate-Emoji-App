prediction1= "";
prediction2= "";
Webcam.set({
    width:350,
    height:300,
    inage_format: "png",
    png_quality:100
});
camera= document.getElementById("camera");
Webcam.attach("#camera");
function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="CapturedImage" src="' + data_uri +'">';
    });
    
}
console.log("ml5 V",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3ZEYLA8z2/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");

}
function Speak(){
    var synth = window.speechSynthesis;
    speakData1="the first prediction is "+ prediction1;
    speakData2="the Second prediction is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
    
}
function Check()
{
    img = document.getElementById("CapturedImage");
    classifier.classify(img, gotResult);

}
function gotResult(error, results){
    if(error){
        console.error(error);

    }else{
        console.log(results);
        document.getElementById("resultName").innerHTML = results[0].label;
        document.getElementById("resultName2").innerHTML = results[1].label;
        prediction1= results[0].label;
        prediction2= results[1].label;
        Speak();
        if(results[0].label== "Happy"){
            document.getElementById("updateEmoji").innerHTML="&#128522;"
        }
        if(results[0].label== "Angry!"){
            document.getElementById("updateEmoji").innerHTML="&#128545;"
        }
        if(results[0].label== "Sad"){
            document.getElementById("updateEmoji").innerHTML="&#128532;"
        }
        if(results[1].label== "Happy"){
            document.getElementById("updateEmoji2").innerHTML="&#128522;"
        }
        if(results[1].label== "Angry!"){
            document.getElementById("updateEmoji2").innerHTML="&#128545;"
        }
        if(results[1].label== "Sad"){
            document.getElementById("updateEmoji2").innerHTML="&#128532;"
        }
    }
}