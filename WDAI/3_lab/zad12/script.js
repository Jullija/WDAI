var board = document.getElementById("board");
var pointsCounter = document.getElementById("points");
var pointsVar = 0;
var idx = 0; //ile zombiaczków już jest
var zombieRunTime = {};
var health
var gameRunning;



//CUSTOM CURSOR
var cursor = document.getElementById("customCursor");

function moveCursor(event){
    cursor.style.top = (event.pageY - 67.5) + "px";
    cursor.style.left = (event.pageX - 67.5) + "px";
}

//POINTS
function score(){
    pointsCounter.textContent = pointsVar;
}






//ZOMBIE

//zombie was shot 
function zombieShot(){
    pointsVar += 12;
    score();
    clearInterval(zombieRunTime[this.id]); //aby nie animować tego zombiaczka
    this.remove(); //usuwamy tego zombiaczka
    
}

//missed shot
function missedShot(){
    pointsVar -= 6;
    score();
}


//zdjęcie ma wymiary 2000 x 312 px, więc jeden zombiaczek to 200 x 312 px
function walkingZombie(newZombie, speed){
    var interval; //jak często będziemy sprawdzać pozycje zombiaczka
    var startingPosition = 200; //od tych px zaczynamy ruszać zombiaczka
    var curBackgroundPosition = 0; //zmiana na kolejne ruchy zombiaczka
    var curPosition = 0; //przesuwanie się zombiaczka po ekranie

    switch (speed){
        case 1:
            interval = 60;
            break;
        case 2:
            interval = 50;
            break;
        case 3:
            interval = 40;
            break;
        case 4:
            interval = 30;
            break;
        default:
            interval = 20;
            break;
    }


    zombieRunTime[newZombie.id] = setInterval ( () => {
        newZombie.style.backgroundPosition = curBackgroundPosition + startingPosition +"px";
        newZombie.style.left = 101 - curPosition + "vw";
        curBackgroundPosition -= startingPosition;
        curPosition++;

        if (curBackgroundPosition==-1800) //ponowna animacja zombiaczka -> wykonał wszystkie ruchy z obrazka, więc robi je ponownie
            curBackgroundPosition=0;

        if(curPosition==115){ //curPosition jest w vw, więc gdy wyjdzie nam poza obszar ekranu
            newZombie.remove();
            pointsVar -= 6;
            health -= 1;
            score();
            if(health <= 0){
                endGame();
            }
                
            clearInterval(zombieRunTime[newZombie.id]);
        }
    }
    , interval );
}








//create zombie with attributes
function createZombie(speed, size, distanceFromBottom, howFarFromStart){

    var newZombie = document.createElement("div");
    newZombie.classList.add("zombie");
    newZombie.setAttribute("id", idx);

    newZombie.style.transform = "scale(" + size + ")";
    newZombie.style.bottom = distanceFromBottom + "px";
    newZombie.style.right = 100 + howFarFromStart + "vw";

    board.appendChild(newZombie);
    newZombie.addEventListener("click", zombieShot);
    idx += 1;

    walkingZombie(newZombie, speed);
}


//generate zombie attributes (speed, size, distanceFromBottom, howFarFromStart)
function generateAttributes(){
    var speed = Math.floor(Math.random() * 5) + 1;
    var size = Math.random() + 0.5; 
    var distanceFromBottom = Math.floor(Math.random() * 400);
    var howFarFromStart = Math.floor(Math.random() * 20);

    createZombie(speed, size, distanceFromBottom, howFarFromStart);
}




function startGame(){
    health = 3;
    pointsVar = 0;
    score();

    document.body.style.cursor="none";
    board.addEventListener("click", missedShot);
    window.addEventListener("mousemove", moveCursor);

    document.getElementById("lose").style.transform = "translateY(-120%)";
    document.getElementById("lose").style.transition = "1s ease";


    //usuwam zombiaczki z mapy
    zombies = document.querySelectorAll("div.zombie");
       for (var i = 0; i <zombies.length; i++) {
        zombies[i].remove();
    }; 

     gameRunning = setInterval ( () => {
        generateAttributes();
    }
    , 750); //jak często tworzę nowe zombiaczki

}




//END GAME
function endGame(){
    clearInterval(gameRunning); //aby się więcej zombiaków nie tworzyło
    //aby zatrzymały się te, które już są na mapie
    Object.keys(zombieRunTime).forEach(function(key) {
        clearInterval(zombieRunTime[key]);
    });

    document.getElementById("board").removeEventListener("click", missedShot);
    window.removeEventListener("mousemove", moveCursor);
    document.body.style.cursor="default";
    
    document.getElementById("lose").style.transform = "translateY(120%)";
    document.getElementById("lose").style.transition = "1s ease";
    document.getElementById("playAgain").addEventListener("click", startGame);
    
}

startGame();











