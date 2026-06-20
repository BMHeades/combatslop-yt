<script lang="ts">
    import { fade, slide } from "svelte/transition";

    let { id } = $props();

    let vote: null | boolean = $state(null);

    console.log(vote);

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

<div class="pr-3">
    {#if vote === null}
        <div
            class="pt-1 font-semibold {vote !== null ? 'opacity-50' : ''}"
            transition:slide
        >
            <button
                disabled={vote !== null}
                class="bg-lime-400 border-lime-600 btn"
                onclick={() => {
                    // alert(id + " is Not slop");
                    upVote();
                }}>Gem</button
            >
            <button
                disabled={vote !== null}
                class="bg-orange-300 border-orange-500 btn"
                onclick={() => {
                    // alert(id + " is Slop");
                    downVote();
                }}>Slop</button
            >
        </div>
    {:else}
        <div class="bg-gray-700 text-white p-1 px-2">
            <p>Thanks!</p>
        </div>
    {/if}
</div>
