var counter = 0;

function increment(){
    if (document.getElementById("numbers").classList.contains("disabled"))
        return;

    counter ++;
    document.getElementById("numbers").textContent = "Licznik wciśnięć: " + counter;
}

function disableCounter(){
    document.getElementById("numbers").classList.add("disabled"); //dodaję klasę, aby wiedzieć, że już nie liczy
    counter = 0;

    document.getElementById("numbers").textContent = "Licznik wciśnięć: 0";
}


function enableCounter(){
    if(!document.getElementById("numbers").classList.contains("disabled")) //jeśli nie został zdezaktywowany, to nic nie zmieniam
        return;

    document.getElementById("numbers").classList.remove("disabled"); //heśli miał to usuwam klase disabled

}


document.getElementById("count").onclick = increment;
document.getElementById("disable").onclick = disableCounter;
document.getElementById("enable").onclick = enableCounter;

