<script>
    let {id, isSlop} = $props()
</script>

<!-- <div class="inline-block text-[1.25rem] rounded-sm bg-zinc-600/30 px-2 py-0.5 font-semibold text-orange-400"> -->
<div>
    {#if isSlop}
    <div class="inline-block p-2 text-base bg-orange-300">
        <p class="">{id}</p>
    </div>
    {:else}
    <div class="inline-block p-2 text-base bg-lime-300">
        <p class="">{id}</p>
    </div>
    {/if}
</div>