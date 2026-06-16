

<script lang="ts">


    let { id } = $props();

    let vote: null | boolean = $state(null);
    // storage.getItem<boolean>(`sync:${id}`).then((liked) => (vote = liked));

    // $effect(() => {
    //     storage.setItem<boolean>(`sync:${id}`, vote);
    // });

    console.log(vote)

    function upVote() {
        vote = true;
        console.log('voted Not slop')
    }

    function downVote() {
        vote = false;
        console.log('voted slop')
    }
</script>


<div class="pt-1 font-semibold ">
    <button disabled={vote === true}
        class="bg-lime-400 border-lime-600 {vote === true? "translate-y-2.5 border-b": ""}"
        onclick={() => {
            // alert(id + " is Not slop");
            upVote()
        }}
        >Not Slop</button>
    <button disabled={vote === false && vote !== null}
        class="bg-orange-300 border-orange-500 {vote === false && vote!== null? "translate-y-2.5 border-b": ""}"
        onclick={() => {
            // alert(id + " is Slop");
            downVote()
        }}
        >Slop</button>
</div>
