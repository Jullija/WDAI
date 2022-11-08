let arr = Array.from(document.getElementsByClassName("middleMain"));

function randomCard(){
    let min = 0;
    let max = 2;
    let chosen = Math.floor(Math.random() * (max - min + 1))

    let previousNumber = chosen - 1;
    let nextNumber = chosen + 1;


    if (chosen == 0){
        previousNumber = 2;
        nextNumber = 1;
    }
    else if (chosen == 2){
        previousNumber = 1;
        nextNumber = 0;
    }


    let previousElement = arr[previousNumber];
    let nextElement = arr[nextNumber];
    let newElement = arr[chosen];

    previousElement.removeAttribute("class");
    previousElement.style="";
    previousElement.setAttribute("class", "middleMain");
    previousElement.classList.add("leftMain")
    nextElement.removeAttribute("class");
    nextElement.style=""
    nextElement.setAttribute("class", "middleMain");
    nextElement.classList.add("rightMain");
    newElement.removeAttribute("class");
    newElement.style="";
    newElement.setAttribute("class", "middleMain");

    //zmieniam kolejność w tablicy, aby potem dobrze działało przy przesuwaniu w lewo bądź prawo
    arr = [previousElement, newElement, nextElement];
}




function rightClick(){

    let hiding = arr[1]; //chowa się środkowy
    let newSlide = arr[0]; //wjeżdża ten po lewej
    let rest = arr[2];

    hiding.style.transform = "translate(135%)";
    hiding.style.transition = "1s ease";

    newSlide.style.transform = "translate(0%)";
    newSlide.style.transition = "1s ease";

    rest.style.transform = "translate(-132%)"
    rest.style.transition = "0s"


    //teraz podmianka kolejności w tablicy arr
    arr = [rest, newSlide, hiding];
    return arr;
}

function leftClick(){

    let hiding = arr[1]; //chowa się środkowy
    let newSlide = arr[2]; //wjeżdża ten po prawej
    let rest = arr[0];
    
    hiding.style.transform = "translate(-135%)";
    hiding.style.transition = "1s ease";

    newSlide.style.transform = "translate(0%)";
    newSlide.style.transition = "1s ease";

    rest.style.transform = "translate(132%)"
    rest.style.transition = "0s"


    //teraz podmianka kolejności w tablicy arr
    arr = [ hiding, newSlide, rest];
    return arr;
}


document.getElementById("right").addEventListener("click", rightClick);
document.getElementById("left").addEventListener("click", leftClick);
document.getElementById("lotto").addEventListener("click", randomCard);
