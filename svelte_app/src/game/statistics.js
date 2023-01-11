import { answers } from "./data/wordle-answers.js"

// There are 2314 answers, which means you need
// 11.176 bits of information to determine the answer

// Unreadable but it's easier than typing the alphabet
const allLetters = new Set([...Array(26)].map((_, i) => String.fromCharCode(i + 97)))

export class StatisticsManager {

    constructor() {
        this.possibleAnswers = answers
        this.uncheckedLetters = new Set(allLetters)
        this.invalidLetters = new Set()

        this.guesses = []
    }

    /**
     * Narrow down the possible answers for a given guess
     * @param {Guess} guess 
     */
    updatePossibleAnswers(guess) {

        let newPossibleAnswers = new Set(this.possibleAnswers)

        // Get an iterable array of letters and the score for the word
        let letters = [...guess.word]
        let score = guess.score

        // Each color of letter requires a different type of filtering
        newPossibleAnswers = this._filterGreen(newPossibleAnswers, letters, score)
        newPossibleAnswers = this._filterYellow(newPossibleAnswers, letters, score)
        newPossibleAnswers = this._filterGray(newPossibleAnswers, letters, score)
    
        const prevPossibilitySize = this.possibleAnswers.length
        this.possibleAnswers = Array.from(newPossibleAnswers)

        const probability = this.possibleAnswers.length / prevPossibilitySize

        // log2(p) = ln(p) / ln(2)
        this.guesses.push(new GuessInformation(this.possibleAnswers.length, -Math.log(probability) / Math.log(2)))
    }
    
    /**
     * Remove words from the list of possibilities if they contain a letter that was gray.
     * @param {Array[string]} possibilities a list of previously-possible answers
     * @param {Array[string]} letters a list of letters
     * @param {Array[number]} score 
     * @returns {Array[string]} a filtered list of new possibilities
     */
    _filterGray(possibilities, letters, score) {

        let filteredPossibilities = possibilities

        // Get the letters not in the answer
        let lettersNotInWord = new Set()
            
        score.forEach((value, i) => {

            // mark letters as checked
            // TODO: should this moved to a class that handles visualizing the keyboard?
            this.uncheckedLetters.delete(letters[i])

            if (value === 0) {
                lettersNotInWord.add(letters[i])
            }
        })

        // Mark which letters are invalid
        lettersNotInWord.forEach((letter) => this.invalidLetters.add(letter))

        // Narrow the possible answers down to the words containing the invalid
        lettersNotInWord.forEach((letter) => {
            filteredPossibilities.forEach((word) => {
                if (word.includes(letter)) {
                    filteredPossibilities.delete(word)
                }
            })
        })

        return filteredPossibilities

    }

    /**
     * 
     * @param {Array[string]} possibilities a list of previously-possible answers
     * @param {Array[string]} letters a list of letters
     * @param {Array[number]} score 
     * @returns {Array[string]} a filtered list of new possibilities
     */
    _filterGreen(possibilities, letters, score) {

        let filteredPossibilities = possibilities

        // Get the words with letters in the given spot
        let lettersWithPositions = new Set()
            
        score.forEach((value, i) => {
            if (value == 2) {
                lettersWithPositions.add([i, letters[i]])
            }
        })

        // Narrow the possible answers down to the words containing
        // the letters in the given spots
        filteredPossibilities.forEach((word) => {
            const wordArray = [...word]

            lettersWithPositions.forEach((pair) => {
                if (wordArray[pair[0]] !== pair[1]) {
                    filteredPossibilities.delete(word)
                }
            })
            
        })

        return filteredPossibilities

    }

    /**
     * 
     * @param {Array[string]} possibilities a list of previously-possible answers
     * @param {Array[string]} letters a list of letters
     * @param {Array[number]} score 
     * @returns {Array[string]} a filtered list of new possibilities
     */
    _filterYellow(possibilities, letters, score) {

        let filteredPossibilities = possibilities

        // Get the words with letters not in the given spot
        let lettersWithPositions = new Set()
            
        score.forEach((value, i) => {
            if (value == 1) {
                lettersWithPositions.add([i, letters[i]])
            }
        })

        // Narrow the possible answers down by removing the
        //  words containing the letters in the given spots
        filteredPossibilities.forEach((word) => {
            const wordArray = [...word]

            lettersWithPositions.forEach((pair) => {
                if (wordArray[pair[0]] === pair[1]) {
                    filteredPossibilities.delete(word)
                }
            })
            
        })

        return filteredPossibilities

    }
}

class GuessInformation {

    constructor(numAnswers, information) {
        this.numAnswers = numAnswers
        this.information = information
    }
}
