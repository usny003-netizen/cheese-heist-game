// 🐭 CHEESE HEIST V1
// Role + Wake Time System


let roomID = "";

let players = [];



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



    roomID = Math.random()
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

        alert("กรุณาใส่ชื่อหนู 🐭");

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

        role:"ยังไม่แจก",

        wakeTime:0

    });



}







// ==========================
// จำนวนผู้เล่น
// ==========================

function updateCount(){


    document.getElementById("playerCount")
    .innerHTML = players.length;


}







// ==========================
// เริ่มเกม
// ==========================

function startGame(){



    if(players.length < 4){


        alert(
        "ต้องมีผู้เล่นอย่างน้อย 4 คน 🐭"
        );


        return;


    }




    randomRole();



    document.getElementById("phase")
    .innerHTML =
    "🌙 กลางคืนเริ่มแล้ว";



    showRoles();



    console.log("ข้อมูลเกม");

    console.log(players);



}









// ==========================
// สุ่มบทบาท + ลูกเต๋าเวลา
// ==========================

function randomRole(){



    // เลือกหนูตัวจี๊ด 1 คน

    let sneakyMouse = Math.floor(
        Math.random() * players.length
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



        // ลูกเต๋า 1-6

        player.wakeTime =
        Math.floor(
            Math.random()*6
        ) + 1;



    });



}









// ==========================
// แสดงผลทดสอบ
// ==========================

function showRoles(){



    let text = "";



    players.forEach(function(player){



        text += `

        <div>

        🐭 ชื่อ:
        ${player.name}

        <br>


        🃏 บทบาท:
        ${player.role}

        <br>


        🎲 เวลาตื่น:
        ตี ${player.wakeTime}


        </div>


        <hr>

        `;



    });




    let box =
    document.getElementById("roleList");



    if(box){


        box.innerHTML = text;


    }


    else{


        alert(
        "หา roleList ไม่เจอ"
        );


    }



}
