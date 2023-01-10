import { GameManager } from "./logic.js"

const COLORMAP = {
    0 : "#CCCCCC",
    1 : "#CCCC00",
    2 : "#00CC00"
}

const wordBox = document.getElementById('word-input')
const submitButton = document.getElementById('submit-button')
const guessBox = document.getElementById('guess-container')
const guessCounter = document.getElementById('guess-counter')

const game = new GameManager()
game.start()

submitButton.onclick = () => submitWord(wordBox.value.toLowerCase())

function updateElements() {

    // If there are any guesses
    if (game.guesses.length > 0) {

        Array.from(guessBox.children).forEach((child, i) => {

            child.innerHTML = game.lastGuess.word[i]
            child.style.backgroundColor = COLORMAP[game.lastGuess.score[i]]

        })

        guessCounter.innerHTML = game.guesses.length

    } 
    // if there are no guesses yet
    else 
    {
        Array.from(guessBox.children).forEach((child, i) => {

            child.innerHTML = i
            child.style.backgroundColor = "#0000FF"

        })

        guessCounter.innerHTML = 0
    }

}

function submitWord(word) {

    try {
        game.guess(word)
    } catch (e) {
        alert(e)
    }

    updateElements()

}