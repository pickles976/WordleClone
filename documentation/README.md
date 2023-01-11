# Wordle Clone

## HTML app

### Motivation

I wanted to build an app in the simplest framework possible, a pure vanilla site. I avoided Typescript because I didn't want to mess with webpack and an extra build step. A cli program would have been easier but I am a visual person and wanted to see my guesses.

### Running The Game

Make sure you have node v16 or higher to run http-server

```bash
    cd html_app
    npm install http-server
    http-server .
```

## Svelte app

### Motivation

I have heard good things about Svelte and wanted to try it out, and this project has a central state + dynamic components so I figured I would try it out.

### Running The Game

Make sure you have node v16 or higher

```bash
    cd svelte_app
    npm install
    npm run dev
```

## Commit Message info

My commit messages are pretty short so I want to give insight into my thought process for each commit here:

1. I identified the need for a Trie to check if a word is accepted, also the need to have a list of allowed words and answers. The first thing was just getting a webpage up that would let me check if a word existed in either of these lists. I really like tree data structures and I have written a lot of different trees/Tries so I was able to do it in just one commit so I apologize there’s not more history there.

2. Like with using a Trie for checking the validity of a word, I wanted to verify if my initial ideas about word scoring would work, so I implemented the most basic way of getting a score for a given word.

3. It was clear that if I kept building in main things would get messy, and that there were certain things needed for the game logic like the word lists and the Trie + some functions so encapsulating the game logic in an object seemed to make the most sense. Since I would eventually like to do visualization of each guess it also made sense to make Guesses their own object so they would have named fields and could be easily mapped to DOM components.

4. I needed testing on the Trie since I hadn’t validated it for all cases and I found a bug (wordle only has words of 5 characters so it didn’t matter but I fixed it anyways). I also decided to just do a small test of visualizing a single guess so I didn’t have to rely on console output. Figuring out what Flexbox properties and styles would make it easier to just focus on whatever component library I was planning on using (I wanted to try Svelte.js)

5. N/A

6. I needed to add testing to the GameManager object to check both scores and also error handling. I moved the code that updates the dom into its own function and added try-catch. Also added the stats for multiple games and tested the multi-game logic. I tried to use underscores to make it apparent which functions are supposed to be public vs private. A potential problem I can see with having the GameManager manage its own loop is that if I want to do efficient rendering, like only render new data, then I will either have to keep state outside of the GameManager as well, or pass a render callback into the GameManager that will call when a new guess is made. I think every time there is a button event I will just naively re-render all of the guesses in the grid for now so I don't clutter things.

7. I implemented a little statistics/information class thingy. It uses the colors of a guess to narrow down all the possible words that fit the criteria. The ratio of the possible answers after the guess divided by the previous possible answers is the probability that the answer would be in that subset of words if chosen randomly. From that probability you can get the information content of a guess. Since there are 2314 answers, you would need -log2(2314) or 11.176 bits of information to determine the answer. If you actually guess the answer correctly, you'll notice that the sum of the information content of your guesses is actually ~11.176! I also organized the project structure a bit and realized that I was missing the keyboard visualization that the original Wordle has-- I just just thought of it as an input interface and not as something that guides you through the game by showing you which letters you had already tried. If Svelte ends up being fun enough I will try to implement the keyboard thing as a stretch goal.

8. I read through some Svelte tutorials and got started with a Svelte template. There is considerably less boilerplate compared to something like React, but I'm not sure how it would be for larger projects where you need to manage a central state-- I am not sure what solutions it offers for something like that. It's very fun though!

9. I tried out the Redux-style store in Svelte. It's really awesome and easy to use. It's very easy to subscribe props to store objects with the $ operator. I was hoping to add more visualization to game over stuff and the information theory stuff but the way my game object was set up meant I would either need to send callbacks into the object, or I would need to move some of the game loop logic up into App.svelte, and I felt like that wasn't necessary since I have already worked on this project for quite a bit. If I had known a bit more about Svelte, I hopefully could have architected my app a bit better from the start instead of going so heavy on the OOP. But I am decently pleased with how it turned out even if it is very basic.

## Thoughts and areas of improvement:

What I would do differently if I had to start over from scratch:
- Use the [official](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) private field notation in js
- Take some more time to think about properly splitting up the concerns of the game into an MVC architecture. I would probably try to build around the store since that seems to be the core of a Svelte app.
- Pay more close attention to the subtle features of wordle. The fact that the keyboard is both input and a "score" system made it feel invisible to me, but I noticed its utility once it was gone.
- Use better names, game stats is confusing with Statistics.js

Thanks for coming up with a fun project idea!

