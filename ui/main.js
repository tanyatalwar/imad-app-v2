console.log('Loaded!');
//change the text of the main dev
//getting the particular element from the html element
var element = document.getElementById('main.txt');
//changing the inner html content to new
element.innerHTML = 'New value';

//to move the image
var img = document.getElementById('modi');
//using onclick event shift to left
var marginLeft=0;
function moveRight(){
    marginLeft =  marginLeft + 10;
    img.style.marginLeft  =  marginLeft + 'px';
}
img.onclick = function(){
    //giving jumping effect through css 
    // modi.style.marginLeft='100px';
    //giving moving effect through setInterval
var interval = setInterval(moveRight, 100);  
};