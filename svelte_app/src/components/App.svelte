<script>
    import Guesses from "./Guesses.svelte";
	import { GameManager } from "../game/logic.js"
	import { played, wins, currentStreak, maxStreak } from "../stores.js"
  	import Stats from "./Stats.svelte";

	export let guesses;

	let textInput;

	let game = new GameManager()
	game.start()

	function updateStats() {
		played.update(value => game.played)
		wins.update(value => game.win)
		currentStreak.update(value => game.currentStreak)
		maxStreak.update(value => game.maxStreak)
	}

	function submitGuess() {
		try {
			game.guess(textInput.value)
			guesses = game.guesses
		} catch (e) {
			alert(e)
		}
		updateStats()
	}
</script>

<main>
	<h2>Blurgle:</h2>

	<label for="word-input">Enter your guess:</label>
	<input type="text" minlength=5 maxlength=5 required bind:this={textInput}/>
	<button on:click={submitGuess}>Submit</button>
	<Guesses guesses={guesses}/>
	<Stats />
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>