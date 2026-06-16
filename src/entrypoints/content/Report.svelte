

<script lang="ts">


    let { id } = $props();

    let vote: null | boolean = $state(null);
    storage.getItem<boolean>(`sync:${id}`).then((liked) => (vote = liked));

    $effect(() => {
        storage.setItem<boolean>(`sync:${id}`, vote);
    });

    function upVote() {
        vote = true;
    }

    function downVote() {
        vote = false;
    }
</script>


<div class="bg-amber-400 flex justify-end">
    <button
        onclick={() => {
            alert("Not slop");
        }}
        class="bg-amber-300">Not Slop</button>
    <button
        onclick={() => {
            alert("Slop");
        }}
        class="">Report Slop</button>
</div>
