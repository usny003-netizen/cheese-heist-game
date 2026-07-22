// 🐭 CHEESE HEIST V1


let roomID="";

let players=[];


let cheese="โต๊ะกลาง";


let time=1;


let currentPlayer=null;




// สร้างห้อง

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



addPlayer(name);



document.getElementById("roomID")
.innerHTML=roomID;


update();


alert(
"สร้างห้องสำเร็จ\n"+
roomID
);


}





// เข้าห้อง

function joinRoom(){


let name=
document.getElementById("playerName").value;



if(name=="") return;



addPlayer(name);


update();


}





function addPlayer(name){


if(players.length>=8){

alert("ห้องเต็ม");

return;

}



players.push({

name:name,

role:"",

wakeTime:0,

alive:true

});


}





function update(){


document.getElementById("players")
.innerHTML=
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



document.getElementById("phase")
.innerHTML=
"🌙 กลางคืน";


nextNight();



showStatus();


}





// แจกบทบาท

function setupGame(){



let badMouse=

Math.floor(
Math.random()*players.length
);



players.forEach((p,i)=>{


if(i==badMouse){

p.role=
"🐹 หนูตัวจี๊ด";

}else{

p.role=
"🐭 หนูทั่วไป";

}



p.wakeTime=

Math.floor(
Math.random()*6
)+1;


});



}





// เดินกลางคืน


function nextNight(){



if(time>6){

alert(
"☀️ เช้าแล้ว"
);

return;

}



let awake=

players.filter(
p=>p.wakeTime==time
);



document.getElementById("clock")
.innerHTML=
"เวลา ตี "+time;



if(awake.length){


currentPlayer=awake[0];


document.getElementById("awake")
.innerHTML=
"🐭 หนูที่ตื่น: "
+currentPlayer.name;



}else{


currentPlayer=null;


document.getElementById("awake")
.innerHTML=
"😴 ไม่มีหนูตื่น";


}



time++;


}





// ขโมยชีส


function stealCheese(){



if(currentPlayer==null){

alert(
"ยังไม่มีหนูตื่น"
);

return;

}



if(
currentPlayer.role=="🐹 หนูตัวจี๊ด"

){


cheese="ถูกซ่อน";


alert(
"🐹 หนูตัวจี๊ดขโมยชีส!"
);


}else{


alert(
"🐭 หนูทั่วไปทำอะไรไม่ได้"
);


}



showStatus();


}





function showStatus(){


let text="";


players.forEach(p=>{


text+=

p.name+
" | "+
p.role+
" | ตื่น "+p.wakeTime+
"<br>";

});


document.getElementById("status")
.innerHTML=text;


}
