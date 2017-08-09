//counter code
var button = document.getElementById("counter");
var counter = 0;
button.oncLick = function() {
  
  //Make A Request To Counter Endpoint
  
  //Capture The Response And Store In HTML
  
  //Render The Variable In The Correct Span
  counter = counter + 1;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();
    
};

