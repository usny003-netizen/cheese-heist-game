// 🐭 CHEESE HEIST V1


let roomID = "";

let players = [];

let cheeseLocation = "กลางโต๊ะ";

let nightTime = 1;



// สร้างห้อง

function createRoom(){

let name =
document.getElementById("playerName").value;


if(name==""){

alert("ใส่ชื่อหนูก่อน 🐭");

return;

}



roomID =
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();



addPlayer(name);



document.getElementById("roomID")
.innerHTML = roomID;


updatePlayers();


}



// เพิ่มผู้เล่น

function addPlayer(name){


players.push({

name:name,

role:null,

wakeTime:null,

alive:true

});


}




// เข้าห้อง

function joinRoom(){


let name =
document.getElementById("playerName").value;



if(players.length>=8){

alert("ห้องเต็ม");

return;

}



addPlayer(name);


updatePlayers();


}





function updatePlayers(){


document.getElementById("players")
.innerHTML =
players.length;


}






// เริ่มเกม

function startGame(){


if(players.length<4){

alert(
"ต้องมีผู้เล่น 4 คนขึ้นไป"
);

return;

}



setupGame();



alert(
"🌙 เริ่มกลางคืนแล้ว"
);


console.log(players);


}






// ตั้งค่าเกม

function setupGame(){



// สุ่มหนูตัวจี๊ด

let sneaky =

Math.floor(
Math.random()*players.length
);




players.forEach((player,index)=>{


if(index==sneaky){


player.role=
"หนูตัวจี๊ด 🐹";


}else{


player.role=
"หนูทั่วไป 🐭";


}



// ทอยลูกเต๋าเวลา

player.wakeTime =

Math.floor(
Math.random()*6
)+1;



});


}






// เรียกเวลาตื่น


function nightRound(){



if(nightTime>6){

dayPhase();

return;

}



let awakePlayers =

players.filter(
p=>p.wakeTime==nightTime
);



console.log(
"เวลา "+nightTime,
awakePlayers
);



nightTime++;


}





// เช้า

function dayPhase(){


alert(
"☀️ เช้าแล้ว! เริ่มอภิปรายและโหวต"
);


}
