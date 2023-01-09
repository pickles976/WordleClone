import { Trie } from "./trie.js";
import { allowed } from "./data/wordle-allowed.js"
import { answers } from "./data/wordle-answers.js"

/**
 * Runs the game loop. 
 */
export class GameManager {

    constructor() {
        this.currentAnswer = null
        this.guesses = []
        this.allWords = []
        this.trie = null

        this.init()
    }

    init() {
        this.trie = new Trie()
        this.allWords = allowed.concat(answers)
        this.allWords.forEach((word) => this.trie.insert(word))
    }

    startNewRound() {
        this.currentAnswer = answers[Math.floor(answers.length * Math.random())]
        this.guesses = []
        console.log(this.currentAnswer)
    }

    evaluateWord(word) {

        if(word.length != 5) {
            alert(`Your word is only ${word.length} letters! It needs to have 5 letters!`)
        }
    
        if (!this.trie.has(word)) {
            alert(`Word is not valid`)
        }
    
        // process the word
        let scores = new Array(5).fill(0)
    
        word.split('').forEach((character, i) => {
            scores[i] += this.currentAnswer.includes(character) ? 1 : 0
        })
    
        word.split('').forEach((character, i) => {
            scores[i] += (this.currentAnswer[i] === character) ? 1 : 0
        })

        const guess = new GuessObject(word, scores)
    
        this.guesses.push(guess)

        console.log(this.guesses)

        return guess
    
    }

}

class GuessObject {

    constructor(word, score){
        this.word = word
        this.score = score
    }

}