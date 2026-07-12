<script lang="ts">
  import logo from "@/assets/logo.png";
  import { configure } from "@/utils/config.svelte";
  import Toggle from "@/lib/Toggle.svelte";

  // let needsRefresh = $state(false)

  // easter egg
  let catPressed = $state(false);
  if(configure.mode === null && configure.mode === undefined) configure.mode = 0



</script>

<main class="w-80 h-130 accent-amber-600">
  <div class="p-4">
    <!-- Title -->
    <div class="">
      <a href="https://combatslop.com/">
        <h1 class="text-2xl font pt-3 pb-8 text-center tracking-tight">
          COMBAT SLOP
          <!-- {browser.runtime.getManifest().name} -->
          <b class="text-amber-500">BETA</b>
        </h1>
      </a>

      <div class="flex flex-col items-center gap-2">
        <Toggle bind:checkedToggle={configure.enabled} size="lg" />
        <p class="text-lg">{configure.enabled ? "Enabled" : "Disabled"}</p>
      </div>
    </div>

    <div class="p-4 pt-6 flex flex-col gap-3 {!configure.enabled && 'grayscale'}">
      
      <!-- <button onclick={toggleMode} class="text-black bg-amber-700 hover:bg-amber-600 p-2 text-base rounded-sm">
        Current mode - {modes[configure.mode]}
      </button> -->

      <fieldset class="flex justify-between gap-0 text-sm text-gray-200 rounded-sm" disabled = {!configure.enabled}>
        <legend class="pb-1" >Mode</legend>
        <button title="Only adds labels such as 'gem' and 'slop', hides no videos" onclick={()=> configure.mode = 0} class="p-1 w-full  {configure.mode === 0 ? ' text-black bg-gray-100' : "hover:bg-stone-800"}">Labels</button>
        <button title="Hides videos that are marked as 'slop'" onclick={()=> configure.mode = 1} class="p-1 w-full  {configure.mode === 1 ? ' text-black bg-gray-100' : "hover:bg-stone-800"}">Hide slop</button>
        <button title="Agreesively hides everything except videos marked as 'gem'. This mode is not recommended" onclick={()=> configure.mode = 2} class="p-1 w-full  {configure.mode === 2 ? ' text-black bg-gray-100' : "hover:bg-stone-800"}">Gems only</button>
      </fieldset>

      <fieldset disabled = {!configure.enabled}>
        <legend>Feed Options</legend>
        <div class="flex gap-1 items-center">
          <input
            type="checkbox"
            id="hideShorts"
            bind:checked={configure.hideShorts}
          />
          <label for="hideShorts">Hide Youtube Shorts</label>
        </div>
        <div class="flex gap-1 items-center">
          <input
            type="checkbox"
            id="hideAds"
            bind:checked={configure.hideAdsSlot}
          />
          <label for="hideAds">Hide Youtube Sponsors</label>
        </div>
        <div class="flex gap-1 items-center">
          <input
            type="checkbox"
            id="hideMovies"
            bind:checked={configure.hideMovies}
          />
          <label for="hideMovies">Hide Youtube Movies</label>
        </div>
        <!-- <div class="flex gap-1 items-center">
          <input
            type="checkbox"
            id="onlyGems"
            bind:checked={configure.showOnlyGems}
          />
          <label for="onlyGems">Show Only Gems</label>
        </div> -->
        <!-- <div class="flex gap-1 items-center">
          <input
            type="checkbox"
            id="debug"
            bind:checked={configure.debugMode}
          />
          <label for="debug">Debug Mode</label>
        </div> -->
      </fieldset>
       <div class="pt-0 flex justify-center">
      <button onclick={() => (catPressed = !catPressed)} class="h-36">
        <img
          class="w-36 {catPressed
            ? 'h-25 w-50 translate-y-6'
            : 'h-36'} "
          src={logo}
          alt="Cat poking a slop object logo"
        />
      </button>
    </div>
    </div>   
  </div>
</main>

<footer class="p-4">
  <h2 class="">version {browser.runtime.getManifest().version}</h2>
</footer>

<style>
</style>
