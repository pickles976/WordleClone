import { GameManager } from "./logic.js"

const wordBox = document.getElementById('word-input')
const submitButton = document.getElementById('submit-button')

const game = new GameManager()
game.startNewRound()

submitButton.onclick = () => game.evaluateWord(wordBox.value.toLowerCase())
