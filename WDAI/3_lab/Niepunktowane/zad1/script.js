document.getElementById("buttonik").onclick = function(){
    imie = prompt("Ładnie proszę o imię Twe");
    let mr = "pana";

    if (imie[imie.length - 1] == "a"){
        mr = "panią";
    }

    show = "Witam " + mr +" " + imie + " !";
    document.getElementById("name").innerHTML = show;
}