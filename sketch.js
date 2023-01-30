// set global - needed for external libraries
/* globals ml5 */

const div = document.querySelector("#message")
//const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = 'red';
ctx.fillStyle = "rgb(255,0,0)"
ctx.lineWidth = 1;

let poses = []

// Create a new poseNet method
const poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('pose', (results) => {
  poses = results;
});

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  div.innerHTML = "Posenet model loaded!"
}

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
    
    /* double check your webcam width / height */
    let stream_settings = stream.getVideoTracks()[0].getSettings()
    console.log('Width: ' + stream_settings.width)
    console.log('Height: ' + stream_settings.height)
  });
}

// A function to draw the video and poses into the canvas independently of posenet
function drawCameraIntoCanvas() {
  /* draw a white square
  ctx.fillStyle = "rgba(255,255,255,0.01)"
  ctx.rect(0, 0, 640, 360);
  ctx.fill();
  */
  
  // draw the webcam image
  ctx.drawImage(video, 0, 0, 640, 360); //16:9

  drawEyes()
  //drawSkeleton()
  //console.log(poses)
  window.requestAnimationFrame(drawCameraIntoCanvas);
}


// A function to draw ellipses over the detected keypoints
function drawEyes() {
  // Loop through all the poses detected
  for (const element of poses) {
    // only draw the eyes
    
    let leftEye = poses[0].pose.leftEye
    let rightEye = poses[0].pose.rightEye
    
    if(poses[0].pose.leftEye.confidence > 0.2){
        ctx.beginPath();
        ctx.arc(leftEye.x, leftEye.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    if(poses[0].pose.rightEye.confidence > 0.2){
        ctx.beginPath();
        ctx.arc(rightEye.x, rightEye.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    
    /*
    // draw all the keypoints
    for (let j = 0; j < element.pose.keypoints.length; j += 1) {
      let keypoint = element.pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        ctx.beginPath();
        ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    */
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (const element of poses) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < element.skeleton.length; j += 1) {
      let partA = element.skeleton[j][0];
      let partB = element.skeleton[j][1];
      ctx.beginPath();
      ctx.moveTo(partA.position.x, partA.position.y);
      ctx.lineTo(partB.position.x, partB.position.y);
      ctx.stroke();
    }
  }
}

drawCameraIntoCanvas()