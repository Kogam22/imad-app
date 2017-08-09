console.log('Loaded!');
var element = document.getElementById("main-text");
//Change Text Of main-text
element.innerHTML = "New Value";
//Move The Image
var img = document.getElementById("madi");
img.onclick = function () {
  img.style.marginLeft = '100px';  
};

