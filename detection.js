let detections = [];

const videoElement = document.getElementById('video');


/* Bruker innstillingene  i .setOptions og fører alt inn i results
før det spyttes ut i arrayen detections.*/

 function onFace(results) {
 
  detections = results;
  console.log(detections);
}

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(onFace);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();