// Variables
const gridDisplay = document.querySelector("#grid")
const resultDisplay = document.querySelector("#result")
const triesDisplay = document.querySelector("#tries")
const modalMatch = document.querySelector("#modal-match")
const modalOverlay = document.querySelector("#overlay")
const closeBtn = document.querySelector("#close-btn")
const lvlList = document.querySelector("#levelList")
const startGame = document.querySelector("#play")
const resetGame = document.querySelector("#reset")

// Arrays
const cardArrayOriginal = [
    {
        name: "fries",
        img: "images/fries.png",
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png",
    },
    {
        name: "hotdog",
        img: "images/hotdog.png",
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png",
    },
    {
        name: "milkshake",
        img: "images/milkshake.png",
    },
    {
        name: "pizza",
        img: "images/pizza.png",
    },
]
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let cardsTried = [];

// Select Level
lvlSelect = () => {
    if (lvlList.value === "Hard") {
        cardArray = concatClonedArrays(cardArrayOriginal, 6)
    }   else if (lvlList.value === "Medium") {
        cardArray = concatClonedArrays(cardArrayOriginal, 4)
    }   else if (lvlList.value === "Easy") {
        cardArray = concatClonedArrays(cardArrayOriginal, 2)
    }   else {
            cardArray = [];
        }
    cardArray.sort(() => 0.5 - Math.random())
};

//  Slice the needed Objects out and then double the Array
function concatClonedArrays(arr1, s) {
    arr2 = arr1.slice(0,s);
    arr2 = arr2.concat([...arr2]);
    return arr2   
};

// creates new board
createBoard = () => {
        gridDisplay.textContent ="";
        resultDisplay.textContent = "0";
        triesDisplay.textContent = "0";
        cardsWon = [];
        cardsTried = [];
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener("click", flipCard)
        gridDisplay.append(card)
    };
};

    
// Check if cards match
checkMatch = () => {
    const cards = document.querySelectorAll("#grid img")
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("you clicked the same card");
       
    }    else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].removeEventListener("click", flipCard)
            cards[optionOneId].removeEventListener("click", flipCard)
            cardsWon.push(cardsChosen)
            cardsTried.push(cardsChosen)
            toggleModal();
    }   else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            cardsTried.push(cardsChosen)
    }
    resultDisplay.textContent = cardsWon.length
    triesDisplay.textContent = cardsTried.length
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = "YOU WON!!!"
    }
};

// Turn Cards
function flipCard() {
    const cardId = this.getAttribute("data-id")
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout (checkMatch, 500)
    }
    
};

// Toggle Modal bei Match
toggleModal = () => {
    modalMatch.classList.toggle("active")
    modalOverlay.classList.toggle("active")
};

// reloads page
deleteBoard = () => window.location.reload(true)

// Event Listeners
closeBtn.addEventListener("click", toggleModal)
overlay.addEventListener("click", toggleModal)
lvlList.addEventListener("change", lvlSelect)
startGame.addEventListener("click",createBoard)
resetGame.addEventListener("click",deleteBoard)