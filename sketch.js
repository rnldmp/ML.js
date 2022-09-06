
//Setter opp området koden kjører på
let sketch = function(p){
  let canvas;
  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id('canvas');
  }

  /* Setter bakgrunnen til clear og om sjekker om detetections er undefined i tilleg til om vi har funnet
  et ansikt. den vil da kalle på .faceMesh*/
  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.faceMesh();
      }
    }
  }
    /*bruker arrayen som lages av detection.js til å sette et punkt på alle kordinatene 
    som har blitt funnet*/
  p.faceMesh = function(){
    p.stroke('rgb(0,255,0)'); //farge
    p.strokeWeight(2); //tykkelse

    p.beginShape(p.POINTS);
    for(const element of detections.multiFaceLandmarks[0]){
      let x = element.x * p.width;
      let y = element.y * p.height;
      p.vertex(x, y);
    } 
    p.endShape();
  }
}

let myp5 = new p5(sketch);




/* TODO
    -Sette facemeshen til å duplisere øyne.
    -sette sammen et sett med effekter. 
      1.dukke opp randomly på skjermen.
      2.komme på rekke og rad litt større ennn den forrige ved siden av øynene.
    - implementer lydfunkjsonalitet.
      1.få effektene til å matche musikk som spilles (se tiktoken ofr tips)
    - Få tak i en mini hdmi kabel og se om det er kult å bruke camcorderen.
*/