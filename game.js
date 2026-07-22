// 🐭 CHEESE HEIST V1


let roomID="";

let players=[];


let nightHour=1;


let currentAwake=null;


let cheese="โต๊ะกลาง";


let votes={};





function createRoom(){


let name=
playerName.value.trim();


if(!name)return alert("ใส่ชื่อก่อน");


roomID=
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();


addPlayer(name);


roomIDSpan.innerHTML=roomID;


updateCount();


}





function joinRoom(){


let name=
playerName.value.trim();


if(!name)return;


addPlayer(name);


updateCount();


}






function addPlayer(name){


if(players.length>=8)
return alert("ห้องเต็ม");


players.push({

name:name,

role:"",

wakeTime:0

});


}





function updateCount(){


playerCount.innerHTML=
players.length;


}







function startGame(){


if(players.length<4)
return alert("ต้องมี 4 คนขึ้นไป");


randomRole();


phase.innerHTML=
"🌙 กลางคืน";


showRoles();


}







function randomRole(){


let bad=
Math.floor(
Math.random()*players.length
);



players.forEach((p,i)=>{


p.role=
i==bad?
"🐹 หนูตัวจี๊ด":
"🐭 หนูทั่วไป";



p.wakeTime=
Math.floor(Math.random()*6)+1;



});


}






function showRoles(){


let text="";


players.forEach(p=>{


text+=

`
🐭 ${p.name}<br>
🃏 ${p.role}<br>
🎲 ตื่นตี ${p.wakeTime}
<hr>
`;


});


roleList.innerHTML=text;


}






function nextNight(){



if(nightHour>6){


dayStatus.innerHTML=
"☀️ เริ่มโหวต";


return;


}



let awake=
players.filter(
p=>p.wakeTime==nightHour
);



if(awake.length){


currentAwake=awake[0];


nightStatus.innerHTML=

"🌙 ตี "
+nightHour+
" "
+currentAwake.name+
" ตื่น";


}

else{


nightStatus.innerHTML=

"🌙 ตี "
+nightHour+
" ไม่มีหนูตื่น";


}


nightHour++;


}






function stealCheese(){


if(!currentAwake)
return alert("ไม่มีหนูตื่น");


if(currentAwake.role=="🐹 หนูตัวจี๊ด"){


cheese="ถูกขโมย";


alert("🐹 ขโมยชีสสำเร็จ");


}

else{


alert("🐭 หนูทั่วไป");


}


}






function votePlayer(){


let index=
voteSelect.value;


if(index=="เลือกผู้ต้องสงสัย")
return;


let name=
players[index].name;


votes[name]=
(votes[name]||0)+1;


showVote();


checkWinner();


}






function showVote(){


let text="";


for(let n in votes){


text+=
n+
" : "+
votes[n]+
" คะแนน<br>";


}


voteResult.innerHTML=text;


}






function checkWinner(){


for(let n in votes){


if(votes[n]>=Math.ceil(players.length/2)){


let p=
players.find(
x=>x.name==n
);


if(p.role=="🐹 หนูตัวจี๊ด")
alert("🎉 หนูทั่วไปชนะ");


else
alert("🐹 หนูตัวจี๊ดชนะ");


}


}


}
