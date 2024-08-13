
const whitePaletteColors = ["#F3F3F3", "#D9D9D9", "#000000"];
const blackPaletteColors = ["#1F1C1E", "#2A2C31", "#F3F3F3"];
const reserved = [["a", "ai"], ["e", "enter"], ["i", "imea"], ["o", "ober"], ["u", "ufat"]]
let inputArea = document.getElementById("texto");
let encriptado = true

function toggleFunction(){
    /* Change Color of the page*/
    var image = document.getElementById("image");
    var button = document.getElementById("program-process");
    var root = document.querySelector(":root");
    changeTask(image, button, root)
}

function changeTask(image, button, root){
    if (encriptado) {
        root.style.setProperty("--background", blackPaletteColors[0]);
        root.style.setProperty("--element", blackPaletteColors[1]);
        root.style.setProperty("--text", blackPaletteColors[2]);

        image.src = 'images/open.png';
        button.value = "Desencriptar";

        encriptado = false
    } else {
        root.style.setProperty("--background", whitePaletteColors[0]);
        root.style.setProperty("--element", whitePaletteColors[1]);
        root.style.setProperty("--text", whitePaletteColors[2]);

        image.src = 'images/close.png';
        button.value = "Encriptar";

        encriptado = true
    }
}

function encrypt(letter){
    switch(letter){
        case "a":
            return "ai"
        case "e":
            return "enter"
        case "i":
            return "imea"
        case "o":
            return "ober"
        case "u":
            return "ufat"
        default:
            return letter
    }
}

function textProcessing(){
    let originalText = document.getElementById("texto").value.toLowerCase()
    let modifiedText = []

    if(encriptado){
        let splitText;
        splitText = originalText.split("")
        for (let index = 0; index < splitText.length; index++) {
            modifiedText.push(encrypt(splitText[index]))
        }
        return modifiedText.join("")
    }
    else{
        for (let index = 0; index < reserved.length; index++) {
            if(originalText.includes(reserved[index][1])){
                originalText = originalText.replaceAll(reserved[index][1], reserved[index][0])
            }
        }
        return originalText
    }
}

let popup = createPop("#popup");
document.querySelector("#program-process").addEventListener("click", popup);

function createPop(id){
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");
    let copyBtn = popupNode.querySelector(".copy-btn");
    let text = popupNode.querySelector(".popup-finalText");
    let title = popupNode.querySelector(".popup-title");
    
    function openPop(){
        encriptado ? title.innerHTML = "Texto Encriptado" : title.innerHTML = "Texto Desencriptado"

        text.innerHTML = textProcessing()
        popupNode.classList.add("active")
    }

    function closePop(){
        popupNode.classList.remove("active")
        inputArea.value = ""
    }

    function copyText(){
        let copyValue = text.innerHTML;

        var tempInput = document.createElement("textarea");
        tempInput.value = copyValue;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand("copy");

        document.body.removeChild(tempInput);
    }

    overlay.addEventListener("click", closePop)
    closeBtn.addEventListener("click", closePop)
    copyBtn.addEventListener("click", copyText)
    copyBtn.addEventListener("click", closePop)
    return openPop
}