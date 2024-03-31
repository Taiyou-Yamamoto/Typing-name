const RANDOM_SENTENCE_URL_API = "http://api.quotable.io/random"
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3")
const wrongSound = new Audio("./audio/wrong.mp3")
const correctSound = new Audio("./audio/correct.mp3")

//inputテキストの入力の合否
typeInput.addEventListener("input", () => {

    typeSound.play();
    typeSound.currentTime = 0;
    const sentenceArry = typeDisplay.querySelectorAll("span");
    // console.log(sentenceArry);
    const arryValue = typeInput.value.split("");
    // console.log(arryValue);
    let correct = true;

    sentenceArry.forEach((charactorSpan, index) => {
        if(arryValue[index] == null) {
            charactorSpan.classList.remove("correct")
            charactorSpan.classList.remove("incorrect")
            correct = false;
        } else if(charactorSpan.innerText ==　arryValue[index]) {
            // console.log('correct');
            charactorSpan.classList.add("correct");
            charactorSpan.classList.remove("incorrect");
        } else {
            charactorSpan.classList.add("incorrect");
            charactorSpan.classList.remove("correct");

            wrongSound.volume = 0.3;
            wrongSound.play()
            wrongSound.currentTime = 0;
            correct = false;
        }
    });

    if(correct == true) {
        correctSound.play()
        correctSound.currentTime = 0;
        renderNextSentence()
    }
})


function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content)
}

async function renderNextSentence() {
    const sentence = await GetRandomSentence();
    typeDisplay.textContent = "";
    let oneText = sentence.split("");

    oneText.forEach((character) => {
        const charactorSpan = document.createElement("span");
        charactorSpan.innerText = character;
        // console.log(charactorSpan);
        typeDisplay.appendChild(charactorSpan);
        // charactorSpan.classList.add("correct");
    });

    //テキストボックスの中身を消す
    typeInput.value = "";
    startTimer();
    
}

let startTime;
let originTime = 30;
function startTimer() {
    timer.innerText = originTime;
    startTime = new Date();
    // console.log(startTime);
    setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if(timer.innerText　<= 0) {
        Timeup();
    }
    }, 1000)
}

function getTimerTime() {
    // console.log((new Date() - startTime))
    return Math.floor((new Date() - startTime) / 1000)
}

function Timeup() {
    renderNextSentence();
}

renderNextSentence();