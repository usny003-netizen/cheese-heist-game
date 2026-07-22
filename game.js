// 🐭 CHEESE HEIST V1 FIX


let roomID = "";

let players = [];

let nightHour = 1;

let currentAwake = null;

let cheese = "โต๊ะกลาง";

let votes = {};




// --------------------
// สร้างห้อง
// --------------------

function createRoom(){

    let name =
    document.getElementById("playerName").value.trim();


    if(name === ""){
        alert("กรุณาใส่ชื่อ");
        return;
    }


    roomID =
    Math.random()
    .toString(36)
    .substring(2,8)
    .toUpperCase();


    addPlayer(name);


    document.getElementById("roomID").innerHTML =
    roomID;


    updateCount();

}






// --------------------
// เข้าห้อง
// --------------------

function joinRoom(){

    let name =
    document.getElementById("playerName").value.trim();


    if(name === ""){
        alert("กรุณาใส่ชื่อ");
        return;
    }


    addPlayer(name);

    updateCount();

}






function addPlayer(name){


    if(players.length >= 8){

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
    .innerHTML =
    players.length;

}







// --------------------
// เริ่มเกม
// --------------------

function startGame(){


    if(players.length < 4){

        alert("ต้องมีผู้เล่น 4 คน");

        return;

    }



    randomRole();


    nightHour = 1;


    document.getElementById("phase")
    .innerHTML =
    "🌙 กลางคืน";


    document.getElementById("nightStatus")
    .innerHTML =
    "กดเวลาถัดไป";



    createVoteList();


    showRoles();


}






// --------------------
// สุ่มบทบาท
// --------------------

function randomRole(){



let badMouse =
Math.floor(
Math.random()*players.length
);



players.forEach(function(p,index){


    if(index === badMouse){

        p.role="🐹 หนูตัวจี๊ด";

    }

    else{

        p.role="🐭 หนูทั่วไป";

    }



    p.wakeTime =
    Math.floor(Math.random()*6)+1;



});



}






// --------------------
// เดินกลางคืน
// --------------------

function nextNight(){


    if(nightHour > 6){


        document.getElementById("phase")
        .innerHTML =
        "☀️ กลางวัน";


        document.getElementById("dayStatus")
        .innerHTML =
        "ทุกคนตื่นแล้ว โหวตได้";


        return;

    }



    let awakePlayers =
    players.filter(function(p){


        return p.wakeTime === nightHour;


    });




    if(awakePlayers.length > 0){


        currentAwake =
        awakePlayers[0];


        document.getElementById("nightStatus")
        .innerHTML =

        "🌙 ตี "
        +
        nightHour
        +
        " "
        +
        currentAwake.name
        +
        " ตื่น";


    }

    else{


        currentAwake=null;


        document.getElementById("nightStatus")
        .innerHTML =

        "🌙 ตี "
        +
        nightHour
        +
        " ไม่มีหนูตื่น";


    }



    nightHour++;


}








// --------------------
// ขโมยชีส
// --------------------

function stealCheese(){


    if(currentAwake === null){

        alert(
        "ยังไม่มีหนูตื่น"
        );

        return;

    }



    if(currentAwake.role === "🐹 หนูตัวจี๊ด"){


        cheese="ถูกซ่อน";


        alert(
        "🐹 หนูตัวจี๊ดขโมยชีสแล้ว!"
        );


    }

    else{


        alert(
        "🐭 หนูทั่วไปทำอะไรไม่ได้"
        );


    }


}








// --------------------
// สร้างช่องโหวต
// --------------------

function createVoteList(){


let select =
document.getElementById("voteSelect");



select.innerHTML =
`
<option>
เลือกผู้ต้องสงสัย
</option>
`;



players.forEach(function(p,index){



let option =
document.createElement("option");



option.value=index;


option.innerHTML=p.name;



select.appendChild(option);



});



}







// --------------------
// โหวต
// --------------------

function votePlayer(){



let select =
document.getElementById("voteSelect");


let index =
select.value;



if(index === "เลือกผู้ต้องสงสัย"){

alert("เลือกคนก่อน");

return;

}




let name =
players[index].name;



if(!votes[name]){

votes[name]=0;

}



votes[name]++;



showVote();



}





function showVote(){


let text="";


for(let name in votes){


text +=

name+
" ได้ "
+
votes[name]
+
" คะแนน<br>";



}



document.getElementById("voteResult")
.innerHTML=text;


}
