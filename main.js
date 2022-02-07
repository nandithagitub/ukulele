//C-111

prediction = "";

Webcam.set({
  width: 300,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      "<img id='captured_image' src=" + data_uri + ">";
  });
}

console.log("ml5 version:" + ml5.version);

classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/y8ZEMDcmB/model.json",
  modelLoaded
);

function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "The prediction is" + prediction;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}

function modelLoaded() {
  console.log("Model Loaded!");
}

//C-112

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction = results[0].label;
    speak();
    if (prediction == "Done") {
      document.getElementById("update_emoji").innerHTML = "&#128077;";
    } else if (prediction == "amazing") {
      document.getElementById("update_emoji").innerHTML = "&#128076;";
    } else if (prediction == "victory") {
      document.getElementById("update_emoji").innerHTML = "&#9996;";
    } else if (prediction == "Stop") {
      document.getElementById("update_emoji").innerHTML = "&#9995;";
    }
  }
}
