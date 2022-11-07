function isValid(){
    return document.getElementById("nameAndSurname").checkValidity() && document.getElementById("phone").checkValidity();
}

function deleteContact(){
    var parent = document.getElementById("addedData");
    var index = Array.from(parent.children).indexOf(this.parentNode); //szukam indeksu elementu, który będę usuwać -> zamieniam wszystkie dodane bloki na tablicę (Array.from), a następnie sprawdzam indeks
    //this.parentNode wskazuje na rodzica przecisku do usuwania, czyli na div added -> blok ze wszystkimi wpisanymi danymi
    parent.removeChild(parent.children[index]); //następnie usuwam dziecko rodzina -> element o odpowiednim indeksie

}


function addContact(){
    var formData = new FormData(document.querySelector("form"));

    if (!isValid()){ //jeśli dane są niepoprawne to nie robimy nic
        return;
    }

    var name = formData.get("nameAndSurname");
    var phoneNumber = formData.get("phone");

    //tworzę blok ze wszystkimi danymi, który następnie dodam do sekcji addedData
    var addedElement = document.createElement("div"); 
    addedElement.classList.add("added");

    var addedElementData = document.createElement("div");
    addedElementData.classList.add("namePhone");

    var nameData = document.createElement("h2");
    nameData.textContent = name;
    var phoneData = document.createElement("p");
    phoneData.textContent = phoneNumber;

    var bin = document.createElement("div");
    bin.classList.add("delete");
    var binPicture = document.createElement("img");
    binPicture.classList.add("imgClass");
    binPicture.src="bin.png";




    bin.appendChild(binPicture);
    addedElementData.appendChild(nameData);
    addedElementData.appendChild(phoneData);
    addedElement.appendChild(addedElementData);
    addedElement.appendChild(bin);


  
    document.getElementById("addedData").appendChild(addedElement);
    bin.addEventListener("click", deleteContact);
   // document.getElementById("delete").addEventListener("click", deleteContact);
    
}







document.getElementById("submit").addEventListener("click", addContact);
