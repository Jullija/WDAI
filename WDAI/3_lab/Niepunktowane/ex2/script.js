let idx = 1;
let elements = [["red", "1.jpg"], ["blue", "2.jpg"], ["green", "3.jpg"]]

function changePhoto(){
    document.getElementsByTagName("img")[0].src="assets/" + elements[idx][1];
    document.getElementsByTagName("img")[0].style.borderColor = elements[idx][0];

    idx += 1;
    if(idx == 3){
        idx = 0;
    }
}



