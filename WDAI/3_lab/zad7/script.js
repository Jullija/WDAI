async function getData() {
    var response = await fetch("http://localhost:3000/cities");
    var json = await response.json();
    return json;
}



//PODPUNKT A

async function a(data) {
    var json = data;

    var malopolskie = json.filter(function (entry) {
        return entry.province == "małopolskie";
    });  //odfiltrowuję jedynie miasta z województwa małopolskiego


    var ans = "";

    for (var i in malopolskie) {
        ans += malopolskie[i].name + ", "
    }

    ans = ans.substring(0, ans.length - 2); //usuwam spację i przecinek i wstawiam kropke
    ans += ".";
    document.getElementById("aAnswer").textContent = ans;
}




//PODPUNKT B

function countA(word){
    var counter = 0;
    
    for (var i in word){
        if (word[i] == "a" || word[i] == "A"){
            counter += 1;
        }
        if (counter == 2){
            return true;
        }
    }
    return false;
}


async function b(data){
    var json = data;

    var filtered = json.filter(function (entry) {
        return countA(entry.name);
    });
    
    var ans = "";

    for (var i in filtered) {
        ans += filtered[i].name + ", "
    }

    ans = ans.substring(0, ans.length - 2); //usuwam spację i przecinek i wstawiam kropke
    ans += ".";
    document.getElementById("bAnswer").textContent = ans;
}




//PODPUNKT C

async function c(data){
    var json = data;

   json.sort(function(a, b){ 
        return (b.dentensity - a.dentensity) });;    


    document.getElementById("cAnswer").textContent = json[4].name;
}




//PODPUNKT D
async function d(data){
    var json = data;

    var filtered = json.filter(function (entry){ //odfiltrowuję tylko miasta z odpowiednią liczba mieszkańców
        return entry.people > 100000;
    })

    var ans = "";

    for (var i in filtered){
        ans += filtered[i].name + " city, ";
    }

    ans = ans.substring(0, ans.length - 2); //usuwam spację i przecinek i wstawiam kropke
    ans += ".";
    document.getElementById("dAnswer").textContent = ans;
}




//PODPUNKT E
async function e(data){
    var json = data;
    var counterMore = 0;
    var counterLess = 0;

    for (var i in json){
        if (json[i].people > 80000){
            counterMore += 1;
        }
        else{
            counterLess += 1;
        }
    }

    document.getElementById("eAnswer1").textContent = "Miast powyżej 80000 mieszkańców jest: " + counterMore;
    document.getElementById("eAnswer2").textContent = "Miast poniżej 80000 mieszkańców jest: " + counterLess;

    if (counterMore > counterLess){
        document.getElementById("eAnswer3").textContent = "Więcej jest miast powyżej 80000";
    }
    else{
        document.getElementById("eAnswer3").textContent = "Więcej jest miast poniżej 80000";
    }
}



//PODPUNKT F
async function f(data){
    var json = data;

    var filtered = json.filter(function (enter){
        return enter.township[0] == "P";
    })

    var sum = 0;
    for (var i in filtered){
        sum += filtered[i].area;
    }

    ans = sum/filtered.length;

    document.getElementById("fAnswer").textContent = ans;
}






//PODPUNKT G
async function g(data){
    var json = data;

    var filtered = json.filter(function (enter){
        return enter.province == "pomorskie";
    });

    var counterMore = 0;
    var counterLess = 0;
    
    for (var i in filtered){
        if (filtered[i].people > 5000){
            counterMore += 1;
        }
        else{
            counterLess += 1;
        }
    }

    if (counterLess == 0){
        document.getElementById("gAnswer1").textContent = "Czy miasta z województwa pomorskiego są większe od 5000 osób? TAK";
        document.getElementById("gAnswer2").textContent = "Liczba miast większych: " + counterMore;
        document.getElementById("gAnswer3").textContent = "Liczba miast mniejszych: 0.";
    }
    else{
        document.getElementById("gAnswer1").textContent = "Czy miasta z województwa pomorskiego są większe od 5000 osób? NIE";
        document.getElementById("gAnswer2").textContent = "Liczba miast większych: " + counterMore;
        document.getElementById("gAnswer3").textContent = "Liczba miast mniejszych: " + counterLess;
    }
}



async function answers() {
    var json = await getData();
    a(json);
    b(json);
    c(json);
    d(json);
    e(json);
    f(json);
    g(json);
}

answers();