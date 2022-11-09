const mainCarousel = document.getElementById("middle");
const elements = document.getElementsByClassName("middleMain");
const prevButton = document.getElementById("left");
const nextButton = document.getElementById("right");


let counter = 1;

mainCarousel.style.transform = 'translateX(' + (-600 * counter) +'px)';


function nextButtonFunction(){
    if (counter >= elements.length - 1){
        return;
    }

    mainCarousel.style.transition = "1s ease";
    counter += 1;
    mainCarousel.style.transform = 'translateX(' + (-600 * counter) +'px)';
}

function prevButtonFunction(){
    if (counter <= 0){
        return;
    }
    mainCarousel.style.transition = "1s ease";
    counter -= 1;
    mainCarousel.style.transform = 'translateX(' + (-600 * counter) +'px)';
}


function reachTheEnd(){
    if (elements[counter].id == "lastClone"){
        mainCarousel.style.transition = "none";
        counter = elements.length - 2;
        mainCarousel.style.transform = 'translateX(' + (-600 * counter) +'px)';
    }
    if (elements[counter].id == "firstClone"){
        mainCarousel.style.transition = "none";
        counter = elements.length - counter;
        mainCarousel.style.transform = 'translateX(' + (-600 * counter) +'px)';
    }
}



function random(){
    let min = 0;
    let max = 7;
    let chosen = Math.floor(Math.random() * (max - min + 1));
    if (chosen % 2 != 0){
        chosen += 1;
    }

    mainCarousel.style.marginLeft = chosen * 600 + "px";

}


nextButton.addEventListener("click", nextButtonFunction);
prevButton.addEventListener("click", prevButtonFunction);
mainCarousel.addEventListener("transitionend", reachTheEnd);
document.getElementById("lotto").addEventListener("click", random);

