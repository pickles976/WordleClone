# Wordle Clone

## Running The Game

```bash
    npm install http-server
    http-server .
```

## Commit Message info

My commit messages are pretty short so I want to give insight into my thought process for each commit here:

1. I identified the need for a Trie to check if a word is accepted, also the need to have a list of allowed words and answers. The first thing was just getting a webpage up that would let me check if a word existed in either of these lists. I really like tree data structures and I have written a lot of different trees/Tries so I was able to do it in just one commit so I apologize there’s not more history there.

2. Like with using a Trie for checking the validity of a word, I wanted to verify if my initial ideas about word scoring would work, so I implemented the most basic way of getting a score for a given word.

3. It was clear that if I kept building in main things would get messy, and that there were certain things needed for the game logic like the word lists and the Trie + some functions so encapsulating the game logic in an object seemed to make the most sense. Since I would eventually like to do visualization of each guess it also made sense to make Guesses their own object so they would have named fields and could be easily mapped to DOM components.

4. I needed testing on the Trie since I hadn’t validated it for all cases and I found a bug (wordle only has words of 5 characters so it didn’t matter but I fixed it anyways). I also decided to just do a small test of visualizing a single guess so I didn’t have to rely on console output. Figuring out what Flexbox properties and styles would make it easier to just focus on whatever component library I was planning on using (I wanted to try Svelte.js)

5. N/A

6. I needed to add testing to the GameManager object to check both scores and also error handling. I moved the code that updates the dom into its own function and added try-catch. Also added the stats for multiple games and tested the multi-game logic. I tried to use underscores to make it apparent which functions are supposed to be public vs private. A potential problem I can see with having the GameManager manage its own loop is that if I want to do efficient rendering, like only render new data, then I will either have to keep state outside of the GameManager as well, or pass a render callback into the GameManager that will call when a new guess is made. I think every time there is a button event I will just naively re-render all of the guesses in the grid for now so I don't clutter things.



