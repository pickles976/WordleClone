import { GameManager, Guess } from "./logic.js"
import { StatisticsManager } from "./statistics.js"
import { Trie } from "./trie.js"

function testTrie() {

    const trie = new Trie()

    // Test Empty
    console.assert(!trie.has("perilous"))
    console.assert(!trie.has("peril"))

    trie.insert("perilous")

    // Test substring
    console.assert(trie.has("perilous"))
    console.assert(!trie.has("peril"))

    trie.insert("peril")

    // Test substring insertion
    console.assert(trie.has("perilous"))
    console.assert(trie.has("peril"))

    // Test superstring
    console.assert(!trie.has("perilously"))

    // Test superstring insertion
    trie.insert("perilously")
    console.assert(trie.has("perilously"))

    // Test lowercase
    trie.insert("UPPERCASE")

    console.assert(trie.has("UPPERCASE"))
    console.assert(trie.has("uppercase"))
    console.assert(trie.has("uPpErCaSe"))

}

function scoresEqual(score1, score2) {
    for(let i = 0; i < score1.length; i++){
        if (score1[i] != score2[i]) {
            return false
        }
    }
    return true
}

function testSingleRound() {

    const gameManager = new GameManager()
    gameManager.currentAnswer = "house"

    // Test correct location
    gameManager.guess("mouse")
    let guess1 = gameManager.lastGuess
    console.assert(scoresEqual(guess1.score, [0, 2, 2, 2, 2]))
    console.assert(guess1.word, "mouse")

    // Test incorrect location
    gameManager.guess("spoon")
    let guess2 = gameManager.lastGuess
    console.assert(scoresEqual(guess2.score, [1, 0, 1, 1, 0]))
    console.assert(guess2.word, "spoon")

    // Test all incorrect
    gameManager.guess("tatar")
    let guess3 = gameManager.lastGuess
    console.assert(scoresEqual(guess3.score, [0, 0, 0, 0, 0]))
    console.assert(guess3.word, "tatar")

    // Catch invalid word
    try {
        gameManager.guess("syzyg")
    } catch (e) {
        console.assert(e, 'syzyg is not a valid word')
    }

    // Catch incorrect size
    try {
        gameManager.guess("flip")
    } catch (e) {
        console.assert(e, 'Your word is only 4 letters! It needs to have 5 letters!')
    }

}

function testMultipleRounds() {

    const gameManager = new GameManager()

    // Test failure
    gameManager.currentAnswer = "house"

    for (let i = 0; i < 6; i++){
        gameManager.guess("frogs")
    }

    console.assert(gameManager.played == 1)
    console.assert(gameManager.win == 0)
    console.assert(gameManager.currentStreak == 0)
    console.assert(gameManager.maxStreak == 0)

    // Test success
    gameManager.currentAnswer = "house"

    gameManager.guess("house")

    console.assert(gameManager.played == 2)
    console.assert(gameManager.win == 1)
    console.assert(gameManager.currentStreak == 1)
    console.assert(gameManager.maxStreak == 1)

    // Test streak
    gameManager.currentAnswer = "frogs"

    gameManager.guess("frogs")

    console.assert(gameManager.played == 3)
    console.assert(gameManager.win == 2)
    console.assert(gameManager.currentStreak == 2)
    console.assert(gameManager.maxStreak == 2)

    // Test streak break
    gameManager.currentAnswer = "boats"

    for (let i = 0; i < 6; i++){
        gameManager.guess("frogs")
    }

    console.assert(gameManager.played == 4)
    console.assert(gameManager.win == 2)
    console.assert(gameManager.currentStreak == 0)
    console.assert(gameManager.maxStreak == 2)

}

function testStatisticsManager() {

    const statsMan = new StatisticsManager()

    // Test the word 'Kebab'
    let guess1 = new Guess("bobby", [1, 0, 2, 1, 0])
    statsMan.updatePossibleAnswers(guess1)

    console.assert(statsMan.possibleAnswers.length === 34)

    let guess2 = new Guess("knife", [2, 0, 0, 0, 1])
    statsMan.updatePossibleAnswers(guess2)

    console.assert(statsMan.possibleAnswers.length === 1)

    // Test we got the only possible answer
    console.assert(statsMan.possibleAnswers[0] === "kebab")

}

testTrie()
testSingleRound()
testMultipleRounds()
testStatisticsManager()