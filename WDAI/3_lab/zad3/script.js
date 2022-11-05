document.getElementById("add").onclick = function(){
    var counter = document.getElementById("list").childElementCount + 1; //sprawdzam, ile lista ma już dzieci, będzie miała jeszcze jedno
    var element = document.createElement("li");
    var text = document.createTextNode("Item " + counter);

    element.appendChild(text); //dodaję napis
    document.getElementById("list").appendChild(element);

}


document.getElementById("delete").onclick = function(){
    var toRemove = document.getElementById("list")
    toRemove.removeChild(toRemove.childNodes[0]);
}