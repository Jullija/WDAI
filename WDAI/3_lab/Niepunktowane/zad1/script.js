document.getElementById("buttonik").onclick = function(){
    imie = prompt("Ładnie proszę o imię Twe");
    show = "Cześć " + imie + " !";
    document.getElementById("name").innerHTML = show;
}