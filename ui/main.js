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
// img.onclick = function(){
//     //giving jumping effect through css 
//     // modi.style.marginLeft='100px';
//     //giving moving effect through setInterval
// var interval = setInterval(moveRight, 100);  
// };



//counter code
var button = document.getElementById('button');
// var counter = 0;
button.onclick = function ()
{
    // create a request object
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
      if(request.readyState == XMLHttpRequest.DONE)
      {
          //we want to take some action
          if(request.status == 200)
          {
              var counter = request.reponseText;
               //capture a response and store it in a variable
    // render the variable in correect span
    // counter = counter+1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
          }
          
      }
      // not done yet
    };
   // make a req
   request.open('GET', 'http://tanyatalwar.imad.hasura-app.io/counter', true);
   request.send(null);
};



//Submit name code it give name to server and return the matching
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('Submit_button');
submit.onclick = function(){
    //this function should make a request to the server and send the name
    //compare a list of name and render it
    var name = ['name1','name2','name3'];
    var list = '';
    for(var i=0; i< names.length;i++)
    {
        list += '<li>' + names[i] +'</li>';
    }
    var ul = document.getElementById('name_list');
    ul.innerHTML = list;
};