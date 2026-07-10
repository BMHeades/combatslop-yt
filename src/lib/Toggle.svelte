<script lang="ts">
    let { checkedToggle = $bindable(), size  } = $props()

    let switchClass = ""
    let dotClass = ""
    switch(size){

        case 'sm':
            switchClass = "w-8 h-4"
            dotClass = "left-0.5 top-0.5 w-3 h-3 peer-checked:translate-x-4"
            break;

        case 'md':
            switchClass = "w-16 h-8"
            dotClass = "left-1 top-1 w-6 h-6 peer-checked:translate-x-8"
            break;

        case 'lg':
            switchClass = "w-32 h-16"
            dotClass = "left-2 top-2 w-12 h-12 peer-checked:translate-x-16"
            break;

        case 'xl':
            switchClass = "w-48 h-24"
            dotClass = "left-3 top-3 w-18 h-18 peer-checked:translate-x-24"
            break;
        
    }

</script>

<label
    class="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
    <input
        type="checkbox"
        class="sr-only peer"
        bind:checked={checkedToggle}
    />
    <div
        class="bg-stone-700 rounded-full peer peer-checked:bg-amber-600 transition-colors duration-200 + {switchClass}"
    ></div>
    <span
        class="dot absolute bg-white rounded-full transition-transform duration-200 ease-in-out + {dotClass}"
    ></span>
    
  
</label>
