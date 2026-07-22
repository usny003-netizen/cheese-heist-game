let roomID="";

let players=[];


function createRoom(){

let name=
document.getElementById("playerName").value;


if(name==""){

alert("ใส่ชื่อก่อน");

return;

}


roomID=
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();


players.push(name);


document.getElementById("roomID")
.innerHTML=roomID;


updatePlayers();

}



function joinRoom(){

let name=
document.getElementById("playerName").value;


players.push(name);

updatePlayers();

}



function updatePlayers(){

document.getElementById("players")
.innerHTML=players.length;

}



function startGame(){

if(players.length<4){

alert("ต้องมีผู้เล่น 4 คนขึ้นไป");

return;

}


alert("🌙 เข้าสู่ช่วงกลางคืน");

}
