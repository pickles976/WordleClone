import { GameManager } from "./logic.js"

const COLORMAP = {
    0 : "#CCCCCC",
    1 : "#CCCC00",
    2 : "#00CC00"
}

const wordBox = document.getElementById('word-input')
const submitButton = document.getElementById('submit-button')
const guessBox = document.getElementById('guess-container')

const game = new GameManager()
game.startNewRound()

submitButton.onclick = () => submitWord(wordBox.value.toLowerCase())

function submitWord(word) {

    let guess = game.evaluateWord(word)

    // Change the letter and color in the boxes
    Array.from(guessBox.children).forEach((child, i) => {

        child.innerHTML = guess.word[i]
        child.style.backgroundColor = COLORMAP[guess.score[i]]

    })

}