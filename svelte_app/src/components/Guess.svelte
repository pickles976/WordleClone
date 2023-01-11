<script>
    import Letter from "./Letter.svelte";

    // Each Guess component has a word and a score
    export let guess
    let word = [...guess.word]
    let score = guess.score
</script>

<div>
    {#each word as character, i}
        <Letter character={character} color={score[i]}/>
    {/each}
</div>

<style>
	div {
		display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
	}
</style>