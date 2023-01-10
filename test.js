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

    // // Test superstring insertion
    // trie.insert("perilously")
    // console.assert(trie.has("perilously"))

    // // Test lowercase
    // trie.insert("UPPERCASE")

    // console.assert(trie.has("UPPERCASE"))
    // console.assert(trie.has("uppercase"))
    // console.assert(trie.has("uPpErCaSe"))

}

testTrie()