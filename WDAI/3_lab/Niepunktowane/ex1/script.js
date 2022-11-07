document.getElementById("button").onclick = () => {
    let name = prompt("Hi! What's your name? ")
    helloText = 'Hello ' + name + '!';
    document.getElementById("userName").textContent = helloText;
}