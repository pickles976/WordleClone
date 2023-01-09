import { Trie } from "./trie.js";

console.log("Hello, world!");

const wordBox = document.getElementById('word-input')
const submitButton = document.getElementById('submit-button')

submitButton.onclick = (event) => console.log(wordBox.value)

const trie = new Trie()

trie.insert("word")
console.log(trie)
console.log(trie.has("word"))
console.log(trie.has("sus"))