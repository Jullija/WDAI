let passwordVisibility = false;
let password = document.getElementById("newPassword");
let repeatPassword = document.getElementById("repeatPassword");


function seePasswordNew(){
    if (passwordVisibility == false){
        passwordVisibility = true;
        password.setAttribute("type", "text");
        document.getElementById("first").setAttribute("src", "view.png");
    }
    else{
        passwordVisibility = false;
        password.setAttribute("type", "password");
        document.getElementById("first").setAttribute("src", "hide.png");
    }
}

function seePasswordRepeat(){
    if (passwordVisibility == false){
        passwordVisibility = true;
        repeatPassword.setAttribute("type", "text");
        document.getElementById("second").setAttribute("src", "view.png");
    }
    else{
        passwordVisibility = false;
        repeatPassword.setAttribute("type", "password");
        document.getElementById("second").setAttribute("src", "hide.png");
    }
}




function checkPasswordStrength(password){
    let passwordStrengthVar = 0;

    //8 characters check
    if (password.length > 7){
        passwordStrengthVar += 1;
        document.getElementById("eight").setAttribute("src", "tick.png");
    }
    else{
        document.getElementById("eight").setAttribute("src", "cross.png");
    }

    //special character
    if (password.match(/([!,@,#,$,%,^,&,*,~,",/,<,>,:,;,_,-,?])/)){
        passwordStrengthVar += 1;
        document.getElementById("special").setAttribute("src", "tick.png");
    }
    else{
        document.getElementById("special").setAttribute("src", "cross.png");
    }

    //capital letter
    if (password.match(/([A-Z])/)){
        passwordStrengthVar += 1;
        document.getElementById("capital").setAttribute("src", "tick.png");
    }
    else{
        document.getElementById("capital").setAttribute("src", "cross.png");
    }


    //digit
    if (password.match(/([0-9])/)){
        passwordStrengthVar += 1;
        document.getElementById("digit").setAttribute("src", "tick.png");
    }
    else{
        document.getElementById("digit").setAttribute("src", "cross.png");
    }

    return passwordStrengthVar;

}

function passwordStrength(){
    let passwordValue = document.getElementById("newPassword").value;
    checkPasswordStrength(passwordValue);
}


function passwordCompare(event){
    if (event.key == "Enter"){
        if (password.value != repeatPassword.value){
            alert("Hasła się nie zgadzają");
        }
        else if (checkPasswordStrength(password.value) != 4){
            alert("Hasło nie spełnia wszystkich wymagań");
        }
        else{
            alert("Wszystko jest poprawne");
        }

    }
}






document.getElementById("first").addEventListener("click", seePasswordNew);
document.getElementById("second").addEventListener("click", seePasswordRepeat);
password.addEventListener("keyup", passwordStrength);
password.addEventListener("keypress", passwordCompare);
repeatPassword.addEventListener("keypress", passwordCompare);

