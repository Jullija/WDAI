var pointsVar = 0;
var stopPropagation = false; //stopPropagation nie kliknięte
var changeOrder = false;

//stop propagation kliknięte -> wtedy klikam na 3 i tylko 3 się klika.

function addPoints(i, color, bound){ //funkcja do dodawania punktów
    if (pointsVar < bound){
        pointsVar += i;
        document.getElementById("points").textContent = "Aktualna liczba punktów: " + pointsVar;

        let info3 = document.getElementById("infoHere3").textContent
        let info2 = document.getElementById("infoHere2").textContent;
        let info1 = document.getElementById("infoHere1").textContent

        if (changeOrder == false){
            document.getElementById("infoHere1").textContent = "Nacisnąłeś " + color + " przycisk o wartości " + i;
            document.getElementById("infoHere2").textContent = info1;
            document.getElementById("infoHere3").textContent = info2;
        }
        else{
            document.getElementById("infoHere3").textContent = "Nacisnąłeś " + color + " przycisk o wartości " + i;
            document.getElementById("infoHere2").textContent = info3;
            document.getElementById("infoHere1").textContent = info2;
        }

        
    }
    
    if(pointsVar > 30){
        document.getElementById("second").style.backgroundColor = "grey";
    }
    if (pointsVar > 50){
        document.getElementById("third").style.backgroundColor = "grey";
    }
    
}



function firstBlockFunction(){
    addPoints(1, "niebieski", 10**9);
}

function secondBlockFunction(event){
    if (stopPropagation == true){
        event.stopPropagation();
        addPoints(2, "czerwony", 30);
    }
    else{
        addPoints(2, "czerwony", 30);
    }
    
}

function thirdBlockFunction(event){
    if (stopPropagation == true){
        event.stopPropagation();
        addPoints(5, "żółty", 50);
    }
    else{
        addPoints(5, "żółty", 50);
    }
    
}




//kliknięcie przycisku reset
document.getElementById("reset").onclick = function(){
    pointsVar = 0;
    document.getElementById("points").textContent = "Aktualna liczba punktów: 0";
    document.getElementById("second").style.backgroundColor = "red";
    document.getElementById("third").style.backgroundColor = "yellow";
    document.getElementById("propagation").innerText = "STOP PROPAGATION";
    document.getElementById("infoHere1").textContent = "";
    document.getElementById("infoHere2").textContent = "";
    document.getElementById("infoHere3").textContent = "";
    stopPropagation = false;
}



//kliknięcie przycisku stop propagation
document.getElementById("propagation").onclick = function(){
    
    if (stopPropagation == false){
        stopPropagation = true;
        document.getElementById("propagation").innerText = "START PROPAGATION";
    }
    else{
        stopPropagation = false;
        document.getElementById("propagation").innerText = "STOP PROPAGATION";
    }
}

//kliknięcie przycisku change order
document.getElementById("change").onclick = function(){
    if (changeOrder == false){
        changeOrder = true;
        firstBlock.removeEventListener("click", firstBlockFunction, false);
        secondBlock.removeEventListener("click", secondBlockFunction, false);
        thirdBlock.removeEventListener("click", thirdBlockFunction, false);
        firstBlock.addEventListener("click", firstBlockFunction, true);
        secondBlock.addEventListener("click", secondBlockFunction, true);
        thirdBlock.addEventListener("click", thirdBlockFunction, true);


    }
    else{
        changeOrder = false;
        firstBlock.removeEventListener("click", firstBlockFunction, true);
        secondBlock.removeEventListener("click", secondBlockFunction, true);
        thirdBlock.removeEventListener("click", thirdBlockFunction, true);
        firstBlock.addEventListener("click", firstBlockFunction, false);
        secondBlock.addEventListener("click", secondBlockFunction, false);
        thirdBlock.addEventListener("click", thirdBlockFunction, false);
    }
}







let firstBlock = document.getElementById("first");
let secondBlock = document.getElementById("second");
let thirdBlock = document.getElementById("third");

firstBlock.addEventListener("click", firstBlockFunction);
secondBlock.addEventListener("click", secondBlockFunction);
thirdBlock.addEventListener("click", thirdBlockFunction);
    






