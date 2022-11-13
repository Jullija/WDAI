async function getData(){
    var response = await fetch ("http://localhost:3000/countries");
    var json = await response.json();
    return json;
}




//WSZYSTKIE SUBREGIONY
var subregionClicked = false;
var subregions = new Set(); //aby tylko unikalne wartości
var sortedBySubregions = {}; //{subregion, [countries], population, area}

async function subregionsFunction(data){
    var json = data;

    //find all subregions
    for (var i = 0; i < json.length; i++){
        subregions.add(json[i].subregion);
    }

    //add subregions to sortedBySubregions
    var i = 0; 
    for (var element of subregions){
        sortedBySubregions[i] = [element, [], 0, 0];
        i++;
    }


    //adding data about subregion's countries
    for (var i = 0; i < json.length; i++){
        for (var j = 0; j < subregions.size; j++){
            if (sortedBySubregions[j][0] == json[i].subregion){
                sortedBySubregions[j][1].push(json[i]);
                sortedBySubregions[j][2] += json[i].population;
                sortedBySubregions[j][3] += json[i].area;
            }
        }
    }
}


function changePage(){
    var idFirst=this.id; 
    var idArr = idFirst.match(/\d+/); //daje mi indeks subregionu
    var id = idArr[0]; //id subregionu
    var pageId = idFirst[idFirst.length - 1]; //numer klikniętego przycisku
    var container = document.getElementById("container" + id);
    var allCountries = container.querySelectorAll("div.countryData");


    var transform_value = -pageId * 250;

    for (var i = 0; i < allCountries.length; i++){
        allCountries[i].style.transform = "translateY(" + transform_value + "px)";
        allCountries[i].style.transition = "1s ease";
        allCountries[i].style.zIndex = 2;
    }
}



function pushData(id, i, sortedBySubregions, countryName, countryCapital, countryPopulation, countryArea){
    countryName.textContent = sortedBySubregions[id][1][i].name.official;
    countryCapital.textContent = sortedBySubregions[id][1][i].capital;
    countryPopulation.textContent = sortedBySubregions[id][1][i].population;
    countryArea.textContent = sortedBySubregions[id][1][i].area; 
}



function subregionCountries(id){

    var container = document.createElement("div");
    container.classList.add("container");
    container.setAttribute("id", "container" + id);
    container.style.height = 0 + "px";
    container.style.overflow = "hidden";
    document.getElementById("allData").appendChild(container);

    //paginacja
    if (sortedBySubregions[id][1].length > 5){
        var pagination = document.createElement("div");
        pagination.setAttribute("id", "pagination" + id);
        pagination.classList.add("pagination");
        pagination.style.zIndex = 1;
        container.appendChild(pagination);
        

        var howManyPages = Math.ceil((sortedBySubregions[id][1].length * 50) / 250);
       
        for (var i = 0; i < howManyPages; i++){
            var page = document.createElement("div");
            page.classList.add("page");
            page.setAttribute("id", "page" + id + "x" + i);
            page.textContent = i;
            pagination.appendChild(page);
            page.addEventListener("click", changePage);
        }



    }
    
    for (var i = 0; i < sortedBySubregions[id][1].length; i++){
        var countryData = document.createElement("div");
        countryData.classList.add("countryData");
        container.appendChild(countryData);

        var countryName = document.createElement("p");
        countryName.style.width = 25 + "%";

        var countryCapital = document.createElement("p");
        countryCapital.style.width = 25 + "%";

        var countryPopulation = document.createElement("p");
        countryPopulation.style.width = 25 + "%";

        var countryArea = document.createElement("p");
        countryArea.style.width = 25 + "%";

        pushData(id, i, sortedBySubregions, countryName, countryCapital, countryPopulation, countryArea);


        countryData.appendChild(countryName);
        countryData.appendChild(countryCapital);
        countryData.appendChild(countryPopulation);
        countryData.appendChild(countryArea);
    }   

}


function clickedSubregion(){  

    var id = this.id;
    if (subregionClicked == false){
        //pokazuję 5 Państw
        var children = 50 * document.getElementById("container" + id).childElementCount;
        if (children <= 250){
            document.getElementById("container" + id).style.height = children  + "px";
            document.getElementById("container" + id).style.transition = "1s ease";
        }
        else{
             document.getElementById("container" + id).style.height = 300  + "px";
             document.getElementById("container" + id).style.transition = "1s ease";
        }
       
        subregionClicked = true;

    }
    else{
        document.getElementById("container" + id).style.height = 0 + "px";
        subregionClicked = false;

    }
}

function createSubregionsDiv(sortedBySubregions){

    for (var i = 0; i < subregions.size; i++){

        var subregionDiv = document.createElement("div");
        subregionDiv.classList.add("subregion");
        subregionDiv.setAttribute("id", i);
        document.getElementById("allData").appendChild(subregionDiv);
        subregionCountries(i); //funkcja do tworzenia krajów z poszczególnych subregionów
        subregionDiv.addEventListener("click", clickedSubregion);

        var subName = document.createElement("p");
        subName.textContent = sortedBySubregions[i][0];
        var subPopulation = document.createElement("p");
        subPopulation.textContent = sortedBySubregions[i][2];
        var subArea = document.createElement("p");
        subArea.textContent = sortedBySubregions[i][3]

        subregionDiv.appendChild(subName);
        subregionDiv.appendChild(subPopulation);
        subregionDiv.appendChild(subArea);
    }
}



//sortowanie wyników
function sortAnswers(){
    var sortCheckbox = document.getElementById("sortPleaseName");

    if (sortCheckbox.classList.contains("checked")){
        for (var i = 0; i < subregions.size; i++){

            sortedBySubregions[i][1].sort(function (a, b){
              return a.name.official.localeCompare(b.name.official);
                            
            }) 
        }
    }

}


async function answer(){
    var json = await getData();
    subregionsFunction(json);
    createSubregionsDiv(sortedBySubregions);
    sortAnswers();
}   


answer();
