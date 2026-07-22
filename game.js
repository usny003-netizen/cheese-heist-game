// 🐭 CHEESE HEIST V1


let roomID="";


let players=[];




// สร้างห้อง

function createRoom(){


let name=
document.getElementById("playerName").value;



if(name==""){

alert("กรุณาใส่ชื่อ");

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


updateCount();


}





// เข้าห้อง

function joinRoom(){


let name=
document.getElementById("playerName").value;



if(name==""){

alert("กรุณาใส่ชื่อ");

return;

}



addPlayer(name);


updateCount();


}





// เพิ่มผู้เล่น

function addPlayer(name){



if(players.length>=8){

alert("ห้องเต็ม");

return;

}



players.push({

name:name,

role:"",

wakeTime:0

});


}







function updateCount(){


document.getElementById("playerCount")
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



randomRole();


document.getElementById("phase")
.innerHTML=
"🌙 กลางคืนเริ่มแล้ว";


showRoles();


}








// สุ่มบทบาท + เวลา

function randomRole(){



// สุ่มหนูตัวจี๊ด

let sneaky =

Math.floor(
Math.random()*players.length
);




players.forEach((player,index)=>{


if(index===sneaky){


player.role=
"🐹 หนูตัวจี๊ด";


}else{


player.role=
"🐭 หนูทั่วไป";


}



// ลูกเต๋าเวลา 1-6

player.wakeTime=

Math.floor(
Math.random()*6
)+1;



});


}








// แสดงข้อมูลทดสอบ

function showRoles(){



let text="";



players.forEach(player=>{


text+=

"🐭 "
+
player.name
+
"<br>"

+

"บทบาท: "
+
player.role
+
"<br>"

+

"เวลาตื่น: "
+
"ตี "
+
player.wakeTime
+
"<br><br>";



});



document.getElementById("roleList")
.innerHTML=text;



}
