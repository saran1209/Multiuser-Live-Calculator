// socket for front end
var socket = io.connect('/');
var username = prompt('Please enter your name ?')
if (!username){
  username= 'Unknown'
}
let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = "";
let clear ="";


var counter =0;
const inputEl = document.querySelector('input');
inputEl.addEventListener('input', (event) => {
  event.target.value = '';
});
// UnComment The below when you wanna clear the log
localStorage.clear();
var listofcal  = new Array();


function add(x){
getdata();
  if (listofcal.length==10){
    listofcal.pop()
  }
  if (!listofcal){
    listofcal.push(x);
  }
  else{
    listofcal.unshift(x);
  }
  localStorage.setItem("localData", JSON.stringify(listofcal));

}
function getdata(){

  var str = localStorage.getItem("localData");
  if (str != null){
  listofcal = JSON.parse(str);
}
}
function showdata() {
getdata();
  var CALCULATIONS = document.getElementById('display');

  for (i=0; i<listofcal.length;i++)
  {
    var r = CALCULATIONS.insertRow();
    var cell1 = r.insertCell();
    cell1.innerHTML = listofcal[i];
  }
}




for(item of buttons){
    item.addEventListener('click', (e)=>{
        buttonText = e.target.innerText;
        console.log(buttonText);
        if(buttonText== 'X'){
            buttonText ='*';
            screenValue += buttonText;
            screen.value = screenValue ;

        }
        else if(buttonText=='sin') {
            screenValue = Math.sin(screenValue);
            screen.value = screenValue;


        }
        else if(buttonText=='cos') {
            screenValue = Math.cos(screenValue);
            screen.value = screenValue;


        }
        else if(buttonText=='tan') {
            screenValue = Math.tan(screenValue);
            screen.value = screenValue;


        }

        else if(buttonText== 'C'){

            screenValue = screenValue.substring(0, screenValue.length - 1);
            screen.value = screenValue;


        }
        else if(buttonText== '='){
          var output = screenValue + buttonText;
            screenValue = eval(screenValue);
            screen.value = screenValue;
            output=output+screenValue;

            socket.emit('calculate',{
              name: username,
              message:output,
            });
        }
        else if(buttonText== '.'){
            screenValue += buttonText;
            screen.value = screenValue ;
        }
        else if(buttonText=='AC'){

            screenValue = "";
            screen.value = screenValue;
        }
        else {

            screenValue += buttonText;
            screen.value = screenValue ;
        }
    })};
    socket.on('calculate',function(data){
var liveoutput = document.getElementById('output')
var CalDate = new Date();
var Calnew = CalDate.toLocaleTimeString();
var calstr = '<p><strong>'+"&emsp;"+ data.name + ':<strong>'+ data.message +"<span>"+ "&emsp;&emsp;&emsp;" +"("+Calnew +")"+"</span>" +'<p>';
liveoutput.innerHTML += calstr;

var element = document.getElementById('Live');
element.scrollTop = element.scrollHeight;

      var CALCULATIONS = document.getElementById('display');
      var rowCount = CALCULATIONS.rows.length;
      if (rowCount>=10){
        CALCULATIONS.deleteRow(rowCount-1);
      }
var newRow = CALCULATIONS.insertRow(0);
var cell1 = newRow.insertCell(0);

var tabstr = '<p2><strong>'+ data.name + ': <strong>'+"&emsp;"+ data.message +"<span>"+"&emsp;&emsp;&emsp;" +"("+Calnew +")"+"</span>" +'<p2>';
cell1.innerHTML = tabstr;
add(tabstr);

    });
showdata();
