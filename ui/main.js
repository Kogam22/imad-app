console.log('Loaded!');
var element = document.getElementById("main-text");
//Change Text Of main-text
element.innerHTML = "New Value";
//Move The Image
var img = document.getElementById("madi");
var marginLeft=0;
function moveRight () {
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 50);
  img.style.marginLeft = '100px';  
};

