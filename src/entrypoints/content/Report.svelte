

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


<div class="bg-amber-400">
    <button
        onclick={() => {
            alert("Not slop");
        }}
        class="bg-amber-300 w-1/3">Not Slop</button
    >
    <button
        onclick={() => {
            alert("Slop");
        }}
        class="w-1/3">Report Slop</button
    >
</div>
