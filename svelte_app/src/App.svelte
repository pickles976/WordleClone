<script>
    import Guesses from "./Guesses.svelte";
	import { GameManager } from "./game/logic.js"

	export let guesses;

	let textInput;

	let game = new GameManager()
	game.start()

	function submitGuess() {
		try {
			game.guess(textInput.value)
			guesses = game.guesses
		} catch (e) {
			alert(e)
		}
	}
</script>

<main>
	<h2>Blurgle:</h2>

	<div>
        <label for="word-input">Enter your guess:</label>
        <input type="text" minlength=5 maxlength=5 required bind:this={textInput}/>
        <button on:click={submitGuess}>Submit</button>
    </div>

	<Guesses guesses={guesses}/>
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>