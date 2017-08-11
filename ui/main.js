//counter code
console.log("JS Loaded Successfully!");
var button = document.getElementById("counter");
console.log("\"counter\" Is Selected Now");
button.onClick = function() {
  
  console.log("Button Was Clicked");
  //Create A Request To Counter Endpoint
  var request = new XMLHttpRequest();
  console.log("Request Was Created");
  //Capture The Response And Store In HTML
  request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) 
      {   console.log("Checking If Request Was Done");
          //Take Some Action
          if (request.status === 200) 
            { 
                console.log("Check If status Is Completed");
                var counter= request.responseText; 
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
                console.log("counter Was Sent To Span");
            } 
          else 
          { 
              alert('There was a problem with the request.');
              console.log("An Error Occurred With The Request.");
              
          }
      
      } 
      
  };
  //Make A Request
  request.open('GET', 'http://kogam22.imad.hasura-app.io/counter', true);
  request.send(null);
};

        