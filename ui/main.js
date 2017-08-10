//counter code
var button = document.getElementById("counter");
button.onClick = function() {
  
  //Create A Request To Counter Endpoint
  var request = new XMLhttpRequest();
  //Capture The Response And Store In HTML
  request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) 
      {
          //Take Some Action
          if (httpRequest.status === 200) 
            { 
                var counter= request.responseText; 
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            } 
          else { alert('There was a problem with the request.'); }
      
      } 
      
  };
  //Make A Request
  request.open('GET', 'http://kogam22.imad.hasura-app.io/counter', true);
  request.send(null);
};

