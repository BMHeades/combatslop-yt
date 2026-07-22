<script lang="ts">
    import { fly, slide } from "svelte/transition";
    // import { onMount } from 'svelte';

    let { id } = $props();

    let vote: null | boolean = $state(null);

    // svelte-ignore state_referenced_locally
    storage.getItem(`local:${id}`).then((v) => {
        if (typeof v === "boolean") vote = v;
    });

    function upVote() {
        vote = true;
        console.log("voted Not slop");
        browser.runtime.sendMessage({
            type: "vote",
            id,
            isSlop: false,
        });
        console.log(id)
    }

    function downVote() {
        vote = false;
        console.log("voted slop");
        browser.runtime.sendMessage({
            type: "vote",
            id,
            isSlop: true,
        });
    }

    function undoVote() {
        vote = false;
        console.log("undo request sent");
        browser.runtime.sendMessage({
            type: "undoVote"
        });
    }
</script>

<div class="w-full h-15 flex justify-end">
    <div class="flex flex-col w-60">
        {#if vote === null}
            <div class="w-full pt-1 font-semibold" out:slide>
                <button
                    aria-label="Report this video as Not Slop"
                    title="Report this video as Not Slop"
                    disabled={vote !== null}
                    class="bg-lime-400 border-lime-600 btn"
                    onclick={() => {
                        upVote();
                    }}>Not Slop</button
                >
                <button
                    aria-label="Report this video as Slop"
                    title="Report this video as Slop"
                    disabled={vote !== null}
                    class="bg-orange-300 border-orange-500 btn"
                    onclick={() => {
                        downVote();
                    }}>Slop</button
                >
            </div>
        {:else}
            <div
                class="bg-gray-700 w-full text-white p-1 px-2"
                // in:fly={{ opacity: 100, y: 200, duration: 500 }}
                in:slide
            >
                <p class="text-base">Thanks for making the internet better!</p>
                <button onclick={undoVote}>undo</button>
            </div>
        {/if}
    </div>
</div>
