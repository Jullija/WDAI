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
        countryData.classList.add("countryData" + id);
        countryData.classList.add("countryData");
        countryData.setAttribute("id", sortedBySubregions[id][1][i].name.official);
        container.appendChild(countryData);

        var countryName = document.createElement("p");
        countryName.setAttribute("id", "countryName" + id+ "_" + i);
        countryName.style.width = 25 + "%";

        var countryCapital = document.createElement("p");
        countryCapital.setAttribute("id", "countryCapital" + id + "_" + i);
        countryCapital.style.width = 25 + "%";

        var countryPopulation = document.createElement("p");
        countryPopulation.setAttribute("id", "countryPopulation" + id+ "_" + i);
        countryPopulation.style.width = 25 + "%";

        var countryArea = document.createElement("p");
        countryArea.setAttribute("id", "countryArea" + id+ "_" + i);
        countryArea.style.width = 25 + "%";

        countryName.textContent = sortedBySubregions[id][1][i].flag;
        countryCapital.textContent = sortedBySubregions[id][1][i].capital;
        countryPopulation.textContent = sortedBySubregions[id][1][i].population;
        countryArea.textContent = sortedBySubregions[id][1][i].area; 
       


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
        var all = document.querySelectorAll("div.container");
        all.forEach(container =>{
            container.style.height = 0 + "px";
        })

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


function pushData(sortedBySubregions){

    var minPeople = document.getElementById("minPeople").value;
    var maxPeople = document.getElementById("maxPeople").value;
    var minArea = document.getElementById("minArea").value;
    var maxArea = document.getElementById("maxArea").value;

    for (var i = 0; i < subregions.size; i++){
        for (var j = 0; j < sortedBySubregions[i][1].length; j++){
            if (sortedBySubregions[i][1][j].population >= minPeople && sortedBySubregions[i][1][j].population <= maxPeople && sortedBySubregions[i][1][j].area >= minArea && sortedBySubregions[i][1][j].area <= maxArea){
                document.getElementById("countryName" + i + "_" + j).textContent = sortedBySubregions[i][1][j].name.official;
                document.getElementById("countryCapital" + i+ "_" + j).textContent = sortedBySubregions[i][1][j].capital;
                document.getElementById("countryPopulation" + i+ "_" + j).textContent = sortedBySubregions[i][1][j].population;
                document.getElementById("countryArea" + i+ "_" + j).textContent = sortedBySubregions[i][1][j].area;
            }
            else{
                document.getElementById("countryName" + i + "_" + j).textContent = "-";
                document.getElementById("countryCapital" + i+ "_" + j).textContent = "- ";
                document.getElementById("countryPopulation" + i+ "_" + j).textContent = " -";
                document.getElementById("countryArea" + i+ "_" + j).textContent = "- ";
            }
                        
        }
    }
}


//sortowanie wyników
function sortAnswers(){
    var sortCheckboxName = document.getElementById("sortPleaseName");
    var sortCheckboxCapital = document.getElementById("sortPleaseCapital");
    var sortCheckboxPopulation = document.getElementById("sortPleasePopulation");
    var sortCheckboxArea = document.getElementById("sortPleaseArea");

   

    if (sortCheckboxName.classList.contains("checked")){
        for (var i = 0; i < subregions.size; i++){ 
            sortedBySubregions[i][1].sort(function (a, b){
                    return a.name.official.localeCompare(b.name.official);              
            })};
            
        }
        pushData(sortedBySubregions);
    
    

    if (sortCheckboxCapital.classList.contains("checked")){
        for (var i = 0; i < subregions.size; i++){
            sortedBySubregions[i][1].sort(function (a, b){
                if (b.capital != null && a.capital != null){
                    return a.capital[0].localeCompare(b.capital[0]);
                }             
            }) 
        }
        pushData(sortedBySubregions);
    }

    if (sortCheckboxPopulation.classList.contains("checked")){
        for (var i = 0; i < subregions.size; i++){

            sortedBySubregions[i][1].sort(function (a, b){
              return a.population - b.population;
                            
            }) 
        }
        pushData(sortedBySubregions);
    }

    if (sortCheckboxArea.classList.contains("checked")){
        for (var i = 0; i < subregions.size; i++){

            sortedBySubregions[i][1].sort(function (a, b){
              return a.area - b.area
                            
            }) 
        }
        pushData(sortedBySubregions);
    }
}






async function answer(){
    var json = await getData();
    subregionsFunction(json);
    createSubregionsDiv(sortedBySubregions);
    sortAnswers();

    document.querySelectorAll("input").forEach(element => element.addEventListener("keypress", function(event){
        if (event.key == "Enter"){
            pushData(sortedBySubregions);
            }
            }
    )
    );








    document.getElementById("sortPleaseName").addEventListener("click", e => {
        if (document.getElementById("sortPleaseName").classList.contains("checked")){
            document.getElementById("sortPleaseName").classList.remove("checked");
        }
        else{
            document.getElementById("sortPleaseName").classList.add("checked");
            document.getElementById("sortPleaseCapital").classList.remove("checked");
            document.getElementById("sortPleasePopulation").classList.remove("checked");
            document.getElementById("sortPleaseArea").classList.remove("checked");
            sortAnswers();
        }
    })

    document.getElementById("sortPleaseCapital").addEventListener("click", e => {
        if (document.getElementById("sortPleaseCapital").classList.contains("checked")){
            document.getElementById("sortPleaseCapital").classList.remove("checked");
        }
        else{
            document.getElementById("sortPleaseName").classList.remove("checked");
            document.getElementById("sortPleaseCapital").classList.add("checked");
            document.getElementById("sortPleasePopulation").classList.remove("checked");
            document.getElementById("sortPleaseArea").classList.remove("checked");
            sortAnswers();
        }
    })

    document.getElementById("sortPleasePopulation").addEventListener("click", e => {
        if (document.getElementById("sortPleasePopulation").classList.contains("checked")){
            document.getElementById("sortPleasePopulation").classList.remove("checked");
        }
        else{
            document.getElementById("sortPleaseName").classList.remove("checked");
            document.getElementById("sortPleaseCapital").classList.remove("checked");
            document.getElementById("sortPleasePopulation").classList.add("checked");
            document.getElementById("sortPleaseArea").classList.remove("checked");
            sortAnswers();
        }
    })

    document.getElementById("sortPleaseArea").addEventListener("click", e => {
        if (document.getElementById("sortPleaseArea").classList.contains("checked")){
            document.getElementById("sortPleaseArea").classList.remove("checked");
        }
        else{
            document.getElementById("sortPleaseName").classList.remove("checked");
            document.getElementById("sortPleaseCapital").classList.remove("checked");
            document.getElementById("sortPleasePopulation").classList.remove("checked");
            document.getElementById("sortPleaseArea").classList.add("checked");
            sortAnswers();
        }
    })



}   


answer();
