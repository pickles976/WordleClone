export class Trie {

    constructor() {
        this.root = new TrieNode(false)
    }

    insert(word){

        let currentNode = this.root

        word.toLowerCase().split('').forEach((character) => {
            if (currentNode.has(character)) {
                currentNode = currentNode.children[character]
            } else {
                currentNode.children[character] = new TrieNode(false)
                currentNode = currentNode.children[character]
            }
        })

        currentNode.isEnd = true

    }

    has(word) {

        let currentNode = this.root

        for (const character of word.toLowerCase()) {
            if (currentNode.has(character)){
                currentNode = currentNode.children[character]
            } else {
                return false
            }
        }

        return (true && currentNode.isEnd)

    }

}

class TrieNode {

    constructor(isEnd) {
        this.children = {}
        this.isEnd = isEnd
    }

    has(character) {
        return this.children.hasOwnProperty(character)
    }

    insert(character, isEnd){
        this.children[character] = new TrieNode(isEnd)
    }

}