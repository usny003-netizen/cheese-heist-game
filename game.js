// 🐭 CHEESE HEIST V2
// Offline Prototype Before Firebase



let roomID = "";

let players = [];

let myPlayerID = null;

let isHost = false;

let gameStarted = false;


let nightHour = 1;

let currentAwake = null;

let cheeseLocation = "โต๊ะกลาง";


let votes = {};





// ======================
// สร้างห้อง (Host)
// ======================

function createRoom(){


    let name =
    document.getElementById("playerName")
    .value
    .trim();



    if(name === ""){

        alert("กรุณาใส่ชื่อ");

        return;

    }



    roomID =
    Math.random()
    .toString(36)
    .substring(2,8)
    .toUpperCase();



    isHost = true;



    let player = {

        id: Date.now(),

        name:name,

        role:"",

        wakeTime:0,

        host:true

    };



    players.push(player);


    myPlayerID = player.id;



    document.getElementById("roomID")
    .innerHTML = roomID;



    updateCount();

    updateUserStatus();



}






// ======================
// เข้าห้อง
// ======================

function joinRoom(){



    let name =
    document.getElementById("playerName")
    .value
    .trim();



    if(name === ""){

        alert("กรุณาใส่ชื่อ");

        return;

    }



    let player = {


        id: Date.now(),


        name:name,


        role:"",


        wakeTime:0,


        host:false


    };



    players.push(player);



    myPlayerID =
    player.id;



    updateCount();

    updateUserStatus();



}






// ======================
// เพิ่มจำนวนผู้เล่น
// ======================

function updateCount(){


    document.getElementById("playerCount")
    .innerHTML =
    players.length;


}







// ======================
// แสดงสถานะ
// ======================

function updateUserStatus(){


    let me =
    players.find(
        p=>p.id===myPlayerID
    );



    if(!me)return;



    document.getElementById("userStatus")
    .innerHTML =


    me.host ?

    "👑 Host"

    :

    "🐭 Player";


}








// ======================
// เริ่มเกม
// ======================

function startGame(){



    if(!isHost){

        alert(
        "เฉพาะ Host เท่านั้น"
        );

        return;

    }



    if(players.length < 4){

        alert(
        "ต้องมีผู้เล่น 4 คนขึ้นไป"
        );

        return;

    }




    randomRole();


    gameStarted = true;


    nightHour = 1;



    document.getElementById("phase")
    .innerHTML =
    "🌙 กลางคืน";



    document.getElementById("nightStatus")
    .innerHTML =
    "เริ่มกลางคืน ตี 1";



    createMyCardList();


    createVoteList();


}









// ======================
// สุ่มบทบาท
// ======================

function randomRole(){



    let thief =

    Math.floor(
        Math.random()
        *
        players.length
    );




    players.forEach(
    function(player,index){



        if(index === thief){


            player.role =
            "🐹 หนูตัวจี๊ด";


        }

        else{


            player.role =
            "🐭 หนูทั่วไป";


        }




        player.wakeTime =

        Math.floor(
            Math.random()*6
        )+1;



    });


}







// ======================
// สร้างรายชื่อการ์ด
// ======================

function createMyCardList(){



    let select =
    document.getElementById("myPlayer");



    select.innerHTML =
    "<option>เลือกชื่อ</option>";



    players.forEach(
    function(player,index){


        let option =
        document.createElement("option");



        option.value=index;


        option.innerHTML=
        player.name;



        select.appendChild(option);



    });



}







// ======================
// เปิดการ์ด
// ======================

function openCard(){



    let index =
    document.getElementById("myPlayer")
    .value;



    if(index==="เลือกชื่อ"){

        alert("เลือกชื่อก่อน");

        return;

    }



    let player =
    players[index];



    document.getElementById("myCard")
    .innerHTML =


    `
    🃏 ${player.role}
    <br><br>
    🎲 ตื่นเวลา ตี ${player.wakeTime}
    `;


}








// ======================
// กลางคืน
// ======================

function nextNight(){



    if(!gameStarted){

        alert("ยังไม่เริ่มเกม");

        return;

    }



    if(nightHour > 6){


        document.getElementById("phase")
        .innerHTML =
        "☀️ กลางวัน";


        document.getElementById("nightStatus")
        .innerHTML =
        "ทุกคนตื่นแล้ว";


        return;

    }




    let awake =

    players.filter(
        p=>p.wakeTime===nightHour
    );



    if(awake.length > 0){



        currentAwake =
        awake[0];



        document.getElementById("nightStatus")
        .innerHTML =


        `
        🌙 ตี ${nightHour}
        <br>
        🐭 ${currentAwake.name} ตื่น
        `;


    }

    else{


        currentAwake=null;


        document.getElementById("nightStatus")
        .innerHTML =

        `
        🌙 ตี ${nightHour}
        <br>
        ไม่มีหนูตื่น
        `;


    }



    nightHour++;


}








// ======================
// ขโมยชีส
// ======================

function stealCheese(){



    if(!currentAwake){


        alert(
        "ยังไม่มีหนูตื่น"
        );


        return;

    }



    if(currentAwake.role==="🐹 หนูตัวจี๊ด"){


        cheeseLocation =
        "ถูกซ่อน";



        alert(
        "🐹 ขโมยชีสสำเร็จ!"
        );


    }

    else{


        alert(
        "🐭 หนูทั่วไปทำไม่ได้"
        );


    }



}








// ======================
// สร้างช่องโหวต
// ======================

function createVoteList(){


    let select =
    document.getElementById("voteSelect");



    select.innerHTML =
    "<option>เลือกผู้ต้องสงสัย</option>";



    players.forEach(
    function(player,index){



        let option =
        document.createElement("option");



        option.value=index;


        option.innerHTML=
        player.name;



        select.appendChild(option);



    });


}







// ======================
// โหวต
// ======================

function votePlayer(){



    let index =
    document.getElementById("voteSelect")
    .value;



    if(index==="เลือกผู้ต้องสงสัย"){

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
        " : "
        +
        votes[name]
        +
        " คะแนน<br>";

    }



    document.getElementById("voteResult")
    .innerHTML=text;


}
