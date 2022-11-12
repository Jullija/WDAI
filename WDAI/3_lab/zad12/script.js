var cursor = document.getElementById("customCursor");
var board = document.getElementById("board");
var currScore = document.getElementById("points");
var pointsVar = 0;
var idx = 0;
var runningZombies = {};
var health;



//CUSTOM CURSOR
function moveCursor(event){
    cursor.style.top = event.clientY + "px";
    cursor.style.left = event.clientX + "px";
}

function updateScore(){
    currScore.textContent = pointsVar;
}



//ZOMBIE

function zombieShot(){
    pointsVar += 18 //bo 18-6 = 2 (odejmuje mi 6 za kliknięcie w planszę)
    updateScore();
    clearInterval(runningZombies[this.id]);
    this.remove();
}

function missedShot(){
    pointsVar -= 6;
    updateScore();
}


//generate zombie attributes (speed, size, distanceFromBottom, howFarFromStart)
function generateAttributes(){
    var speed = Math.floor(Math.random() * 5) + 1;
    var size = Math.random() + 0.5; 
    var distanceFromBottom = Math.floor(Math.random() * 40);

    createZombie(speed, size, distanceFromBottom);
}



//create zombie with attributes
function createZombie(speed, size, distanceFromBottom){

    var newZombie = document.createElement("div");
    newZombie.classList.add("zombie");
    newZombie.setAttribute("id", idx);
    newZombie.addEventListener("click", zombieShot);

    newZombie.style.transform = "scale(" + size + ")";
    newZombie.style.bottom = distanceFromBottom + "vh";

    board.appendChild(newZombie);
    idx += 1;

    walkingZombie(newZombie, speed);
}


//adding the walking animation
function walkingZombie(newZombie, speed){
    var howOftenChangePosition;

    switch (speed){
        case 1:
            howOftenChangePosition = 60;
            break;
        case 2:
            howOftenChangePosition = 50;
            break;
        case 3:
            howOftenChangePosition = 40;
            break;
        case 4:
            howOftenChangePosition = 30;
            break;
        default:
            howOftenChangePosition = 20;
            break;
    }


    var animationPosition = 2000; //px
    var zombiePosition = -20; //vw

    //animation
    runningZombies[newZombie.id] = setInterval( () => {
        
        //zamiana tła zombie
        newZombie.style.backgroundPosition = animationPosition - 200 + "px";
        animationPosition -= 200;
        if (animationPosition == 0){
            animationPosition = 2000;
        }



        zombiePosition++;
        newZombie.style.right = zombiePosition + "vw";

        //gdy wyjdzie poza mapę
        if (zombiePosition == 105){
            clearInterval(runningZombies[newZombie.id]);
            newZombie.remove();
            health -= 1;
            pointsVar -= 6;
            updateScore();
            if (health == 0){
                endGame();
            }
        }





    }, howOftenChangePosition);

}




var intervalForCreatingZombies;

function startGame(){
    //wartości początkowe
    health = 3;
    pointsVar = 0;
    idx = 0;
    updateScore();

    //odpowiedni kursor
    document.querySelector("body").style.cursor = "none";
    window.addEventListener("mousemove", moveCursor);

    board.addEventListener("click", missedShot);

    //tablica z przegraną usuwa się
    document.getElementById("lose").style.transform = "translateY(125vh)";
    document.getElementById("lose").style.transition = "1s ease";

    //usuwanie zombiaczków, które były na ekranie w momencie przegrania
    activeZombies = document.querySelectorAll("div.zombie");
    for (var i =0; i< activeZombies.length; i++){
        activeZombies[i].remove();
    }

    
    //tworzenie nowych zombiaczków co 750ms
    intervalForCreatingZombies = setInterval( () => {
        generateAttributes();
    }, 750);

}


function endGame(){
    //tablica z przegraną pojawia się
    document.getElementById("lose").style.transform = "translateY(-125vh)";
    document.getElementById("lose").style.transition = "1s ease";

    //kursor zmienia się na normalny
    window.removeEventListener("mousemove", moveCursor);
    document.querySelector("body").style.cursor = "default";

    board.removeEventListener("click", missedShot);

    //aby nie tworzyło się więcej nowych zombiaczków
    clearInterval(intervalForCreatingZombies);

    //wyczyszczę dotychczasowe zombiaki
    activeZombies = document.querySelectorAll("div.zombie");
    for (var i =0; i< activeZombies.length; i++){
        clearInterval(runningZombies[activeZombies[i].id]);
        activeZombies[i].remove();
    }

    document.getElementById("playAgain").addEventListener("click", startGame);


}



startGame();



















