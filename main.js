import { Trie } from "./trie.js";
import { allowed } from "./data/wordle-allowed.js"
import { answers } from "./data/wordle-answers.js"

const trie = new Trie()

const allWords = allowed.concat(answers)

allWords.forEach((word) => trie.insert(word))

let answer = getRandomWord()

console.log(answer)

const wordBox = document.getElementById('word-input')
const submitButton = document.getElementById('submit-button')

submitButton.onclick = () => evaluateWord(wordBox.value.toLowerCase())


function evaluateWord(word) {

    if(word.length != 5) {
        alert(`Your word is only ${word.length} letters! It needs to have 5 letters!`)
    }

    if (!trie.has(word)) {
        alert(`Word is not valid`)
    }

    // process the word
    let scores = new Array(5).fill(0)

    // yellow and gray
    word.split('').forEach((character, i) => {
        scores[i] += answer.includes(character) ? 1 : 0
    })

    // green
    word.split('').forEach((character, i) => {
        scores[i] += (answer[i] === character) ? 1 : 0
    })

    return scores

}

function getRandomWord() {
    return answers[Math.floor(answers.length * Math.random())]
}