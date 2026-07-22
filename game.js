// 🐭 CHEESE HEIST V1
// Night Phase Prototype


let roomID = "";

let players = [];

let nightHour = 1;

let currentAwake = null;

let cheeseLocation = "โต๊ะกลาง";




// ==========================
// สร้างห้อง
// ==========================

function createRoom(){


    let name = document
    .getElementById("playerName")
    .value
    .trim();



    if(name === ""){

        alert("กรุณาใส่ชื่อหนู 🐭");

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


    updateCount();



    alert(
        "สร้างห้องสำเร็จ\nรหัสห้อง: "
        + roomID
    );


}






// ==========================
// เข้าห้อง
// ==========================

function joinRoom(){


    let name = document
    .getElementById("playerName")
    .value
    .trim();



    if(name === ""){

        alert("กรุณาใส่ชื่อหนู");

        return;

    }



    addPlayer(name);


    updateCount();


}







// ==========================
// เพิ่มผู้เล่น
// ==========================

function addPlayer(name){


    if(players.length >= 8){

        alert("ห้องเต็มแล้ว");

        return;

    }



    players.push({

        name:name,

        role:"",

        wakeTime:0,

        alive:true

    });



}







// ==========================
// จำนวนผู้เล่น
// ==========================

function updateCount(){


    document.getElementById("playerCount")
    .innerHTML =
    players.length;


}








// ==========================
// เริ่มเกม
// ==========================

function startGame(){


    if(players.length < 4){


        alert(
        "ต้องมีผู้เล่น 4 คนขึ้นไป"
        );


        return;

    }



    randomRole();



    nightHour = 1;


    currentAwake = null;


    document.getElementById("phase")
    .innerHTML =
    "🌙 กลางคืนเริ่มแล้ว";



    document.getElementById("nightStatus")
    .innerHTML =
    "กดเวลาถัดไปเพื่อปลุกหนู";



    showRoles();


}








// ==========================
// สุ่มบทบาท
// ==========================

function randomRole(){



    let sneakyMouse =

    Math.floor(
        Math.random()
        *
        players.length
    );



    players.forEach(function(player,index){



        if(index === sneakyMouse){


            player.role =
            "🐹 หนูตัวจี๊ด";


        }

        else{


            player.role =
            "🐭 หนูทั่วไป";


        }




        // ลูกเต๋าเวลา 1-6

        player.wakeTime =

        Math.floor(
            Math.random()*6
        )+1;



    });



}








// ==========================
// แสดงข้อมูลทดสอบ
// ==========================

function showRoles(){



    let text = "";



    players.forEach(function(player){


        text +=

        `
        🐭 ${player.name}<br>

        🃏 ${player.role}<br>

        🎲 ตื่นเวลา ตี ${player.wakeTime}

        <hr>
        `;


    });



    document.getElementById("roleList")
    .innerHTML =
    text;



}








// ==========================
// ระบบกลางคืน
// ==========================

function nextNight(){



    if(nightHour > 6){



        document.getElementById("nightStatus")
        .innerHTML =
        "☀️ เช้าแล้ว";


        return;

    }




    let awakePlayers =

    players.filter(function(player){


        return player.wakeTime === nightHour;


    });





    if(awakePlayers.length === 0){


        currentAwake = null;



        document.getElementById("nightStatus")
        .innerHTML =

        "🌙 ตี "
        +
        nightHour
        +
        " ไม่มีหนูตื่น";


    }

    else{


        currentAwake =
        awakePlayers[0];



        document.getElementById("nightStatus")
        .innerHTML =

        "🌙 ตี "
        +
        nightHour
        +
        "<br>🐭 "
        +
        currentAwake.name
        +
        " ตื่นแล้ว";


    }



    nightHour++;


}








// ==========================
// ขโมยชีส
// ==========================

function stealCheese(){



    if(currentAwake === null){


        alert(
        "ยังไม่มีหนูตื่น"
        );


        return;

    }




    if(
        currentAwake.role ===
        "🐹 หนูตัวจี๊ด"

    ){


        cheeseLocation =
        "ถูกซ่อน";



        alert(
        "🐹 หนูตัวจี๊ดขโมยชีสแล้ว!"
        );


    }

    else{


        alert(
        "🐭 หนูทั่วไปไม่ได้ขโมย"
        );


    }



    document.getElementById("nightStatus")
    .innerHTML +=

    "<br>🧀 ชีส: "
    +
    cheeseLocation;



}
