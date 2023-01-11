import { Trie } from "./trie.js";
import { allowed } from "./data/wordle-allowed.js"
import { answers } from "./data/wordle-answers.js"

/**
 * Manages game state and word data.
 */
export class GameManager {

    constructor() {

        // Processing
        this.allWords = []
        this.trie = null

        // Single Game (could be its own object)
        this.currentAnswer = null
        this.guesses = []

        // Historical stats
        this.played = 0
        this.win = 0
        this.currentStreak = 0
        this.maxStreak = 0

        this.lastGuess = null

        this._init()
    }

    /**
     * Start the game loop. Only used once.
     */
    start() {
        this._startNewRound()
    }

    /**
     * A guess is a single iteration of the game loop that handles all the logic for scoring and checking if a round is over.
     * @param {string} word 
     */
    guess(word) {

        let guess = this._evaluateWord(word)

        this.guesses.push(guess)
        this.lastGuess = guess
        
        const totalScore = guess.score.reduce((acc, curr) => acc + curr, 0)

        if (totalScore == 10) {
            console.log(`You win!`)
            this._recordGame(true)
            this._startNewRound()
        }

        if (this._isGameOver()) {
            console.log(`You failed to guess the answer: ${this.currentAnswer} in 6 guesses!`)
            this._recordGame(false)
            this._startNewRound()
        }

    }

    _init() {
        this.trie = new Trie()
        this.allWords = allowed.concat(answers)
        this.allWords.forEach((word) => this.trie.insert(word))
    }

    _recordGame(didWin) {
        this.played += 1
        this.win += didWin ? 1 : 0
        this.currentStreak = didWin ? this.currentStreak + 1 : 0
        this.maxStreak = Math.max(this.currentStreak, this.maxStreak)
    }

    _startNewRound() {
        this.currentAnswer = answers[Math.floor(answers.length * Math.random())]
        this.guesses = []
        console.log(this.currentAnswer)
    }

    _evaluateWord(word) {

        if(word.length != 5) {
            throw new Error(`Your word is only ${word.length} letters! It needs to have 5 letters!`)
        }
    
        if (!this.trie.has(word)) {
            throw new Error(`${word} is not a valid word`)
        }
    
        // process the word
        let scores = new Array(5).fill(0)
    
        word.split('').forEach((character, i) => {
            scores[i] += this.currentAnswer.includes(character) ? 1 : 0
        })
    
        word.split('').forEach((character, i) => {
            scores[i] += (this.currentAnswer[i] === character) ? 1 : 0
        })

        return new Guess(word, scores)
    
    }

    _isGameOver() {
        return (this.guesses.length >= 6)
    }

}

export class Guess {

    constructor(word, score){
        this.word = word
        this.score = score
    }

}