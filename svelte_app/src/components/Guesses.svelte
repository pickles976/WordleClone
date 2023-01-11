<script>
    import Guess from './Guess.svelte'

    export let guesses = []
</script>

<div>
    {#each guesses as guess}
        <Guess guess={guess}/>
    {/each}
</div>

<style>
    div {
        justify-content: center;
        align-items: center;
        display: flex; 
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
    }
</style>