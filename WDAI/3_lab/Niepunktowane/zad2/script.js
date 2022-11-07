let idx = 1;
let elements = [["red", "mountain.jpg"], ["blue", "sea.jpg"], ["green", "forest.jpg"]]

function changePhoto(){
    document.getElementsByTagName("img")[0].style.borderColor = elements[idx][0];
    document.getElementsByTagName("img")[0].src=elements[idx][1];
    
    idx += 1;
    if(idx == 3){
        idx = 0;
    }
}