document.getElementById("first").onclick = function(){
    document.getElementById("mountainId").style.visibility = "hidden";
    document.getElementById("seaId").style.visibility = "visible";
    document.getElementById("first").style.visibility = "hidden";
    document.getElementById("second").style.visibility = "visible";
    
}

document.getElementById("second").onclick = function(){
    document.getElementById("seaId").style.visibility = "hidden";
    document.getElementById("forestId").style.visibility = "visible";
    document.getElementById("second").style.visibility = "hidden";
    document.getElementById("third").style.visibility = "visible";

}

document.getElementById("third").onclick = function(){
    document.getElementById("forestId").style.visibility = "hidden";
    document.getElementById("mountainId").style.visibility = "visible";
    document.getElementById("third").style.visibility = "hidden";
    document.getElementById("first").style.visibility = "visible";

}