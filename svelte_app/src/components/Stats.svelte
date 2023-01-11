<script>
    import { played, wins, currentStreak, maxStreak } from "../stores.js"
</script>

<div style="position: absolute; left: 2%; bottom: 5%; display: flex; justify-content: center; align-items: center;">
    <div>
        <h2>Player Stats:</h2>
        <div>
            Games Played: {$played}
        </div>
        <div>
            Total Wins: {$wins}
        </div>
        <div>
            Current Streak: {$currentStreak}
        </div>
        <div>
            Max Streak: {$maxStreak}
        </div>
    </div>
</div>

<style>
    div {
        text-align: left;
    }
</style>