<script lang="ts">
    import { fade, slide } from "svelte/transition";
    // import { onMount } from 'svelte';


    let { id } = $props();

    let vote: null | boolean = $state(null);

    storage.getItem(`local:${id}`).then((v) => {if(typeof v === "boolean") vote = v})

    function upVote() {
        vote = true;
        console.log("voted Not slop");
        browser.runtime.sendMessage({
          type: "vote",
          id,
          isSlop: false
        })
    }

    function downVote() {
        vote = false;
        console.log("voted slop");
        browser.runtime.sendMessage({
          type: "vote",
          id,
          isSlop: true
        })
    }
</script>

<div class="w-full flex justify-end">
    {#if vote === null}
        <div
            class="pt-1 font-semibold mr-2"
            transition:slide
        >
            <button
                disabled={vote !== null}
                class="bg-lime-400 border-lime-600 btn"
                onclick={() => {
                    upVote();
                }}>Not Slop</button
            >
            <button
                disabled={vote !== null}
                class="bg-orange-300 border-orange-500 btn"
                onclick={() => {
                    downVote();
                }}>Slop</button
            >
        </div>
    {:else}
        <div class="bg-gray-700 text-white p-1 px-2">
            <p class="text-sm">Thanks for making internet better!</p>
        </div>
    {/if}
</div>
