<script lang="ts">
    export let data;

    const apiData = data.apiData

</script>

{#if apiData}
    <pre>{JSON.stringify(apiData, null, 2)}</pre>
{:else}
    <p>Loading or error occurred</p>
{/if}

