var counter = 0;

increment = () =>{
    counter += 1
    document.getElementById("points").innerText = counter;
}

counterTurnOn = () =>{
    document.getElementById("plus").addEventListener("click", increment);
}

counterTurnOff = () =>{
    document.getElementById("plus").removeEventListener("click", increment);
    counter = 0;
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("plus").addEventListener("click", increment);
    document.getElementById("buttonON").onclick = counterTurnOn;
    document.getElementById("buttonOFF").onclick = counterTurnOff;
})
