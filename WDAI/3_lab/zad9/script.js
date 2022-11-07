var employees = 3;
var data = [["first.jpeg", "Jan Kowalski", "Product Manager", "lorem"], ["second.webp", "Mariusz Pudzianowski", "Sportowiec", "ipsum"], ["third.jpeg", "Robert Makłowicz", "Kucharz i podróznik", "tralala"]];
var idx = 0;

function overwritten(idx){
    let photo = document.getElementById("photo");
    let name = document.querySelector("h2");
    let title = document.querySelector("h3");
    let description = document.querySelector("p");

    photo.src=data[idx][0];
    name.innerText=data[idx][1];
    title.innerText=data[idx][2];
}

function rightClick(){
    idx += 1;
    if (idx == employees){
        idx = 0;
    }
    console.log(idx);

    overwritten(idx);
    
}

function leftClick(){
    idx -= 1;
    if (idx == -1){
        idx = 2;
    }

    overwritten(idx);
}


document.getElementById("right").addEventListener("click", rightClick);
document.getElementById("left").addEventListener("click", leftClick);