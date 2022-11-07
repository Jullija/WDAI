function circleFollow(event){
    event.stopPropagation()
    let x = event.offsetX; //pozycje kliknięcia względem pudełka, a nie całego ekranu
    let y = event.offsetY;
    x -= 25;
    y -= 25;
    
    let circle = document.getElementById("circle");
    circle.style.left = x + "px";
    circle.style.top = y + "px";
}

function error(){
    alert("Kliknąłeś poza wyznaczony obszar!");
}



document.getElementById("box").addEventListener("click", circleFollow);
document.querySelector("body").addEventListener("click", error);