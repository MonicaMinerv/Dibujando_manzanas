x = 0;
y = 0;
screen_height=0;
screen_width=0;
apple="";
speak_data="";
to_number="";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload()
{
  apple = loadImage('https://i.postimg.cc/Px6Nz9tH/apple.png');
}

function start()
{
  document.getElementById("status").innerHTML = "El sistema está escuchando. Por favor, habla.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

     document.getElementById("status").innerHTML = "La voz se reconoció como: " + content; 
    
 to_number= Number(content);

 if (Number.isInteger(to_number)) {

  document.getElementById("status").innerHTML = "Se empezó a dibujar manzanas "; 
  draw_apple = "set";
  
 } else {
  document.getElementById("status").innerHTML = "No se reconoció número"; 
 }
}

function setup() {
  screen_width= window.innerWidth;
  screen_height=window.innerHeight; 
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(0,150)
 
}

function draw() {
  if(draw_apple == "set")
  {
    for (i = 0; i < to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple,x,y,30,30)
      
      
    }
    document.getElementById("status").innerHTML = to_number + " manzanas dibujadas";
    draw_apple = "";
    
    speak_data = to_number + 'manzanas dibujadas ';
    speak();
    
    
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
