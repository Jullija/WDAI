let num = 1;

addElement = () => {
    let elem = document.createElement("li");
    elem.innerText = "Element number " + num;
    num += 1;
    document.getElementsByTagName("ul")[0].appendChild(elem);
}

deleteElement = () => {
    if (num > 1){
    let toDelete = document.getElementsByTagName("ul")[0].firstChild;
    document.getElementsByTagName("ul")[0].removeChild(toDelete);
    num -=1;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let addButton = document.getElementById("add");
    let delButton = document.getElementById("delete");
    
    addButton.addEventListener('click', addElement);
    delButton.addEventListener('click', deleteElement);
    
});