<script>
    const COLORMAP = {
    0 : "#CCCCCC",
    1 : "#CCCC00",
    2 : "#00CC00"
    }

    export let color
    export let character

    color = COLORMAP[color]
</script>


<div style="background-color: {color};">{character}</div>

<style>
	div {
        color: white;
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 250%;
        font-family: Arial, Helvetica, sans-serif;
	}
</style>