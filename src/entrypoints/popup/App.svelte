<script lang="ts">
  import logo from "@/assets/logo.png";
  import { configure } from "@/utils/config.svelte";
  import Toggle from "@/lib/Toggle.svelte";

  // let needsRefresh = $state(false)

  // easter egg
  let catPressed = $state(false);
</script>

<main class="w-80 h-130 accent-amber-600">
  <div class="p-4">
    

    <!-- Title -->
    <div class="">
      <a href="https://combatslop.com/">
        <h1 class="text-2xl font pt-4 pb-10 text-center tracking-tight">
          COMBAT SLOP
          <!-- {browser.runtime.getManifest().name} -->
          <b class="text-amber-500">BETA</b>
        </h1>
      </a>

      <div class="flex flex-col items-center gap-4">
        <Toggle bind:checkedToggle={configure.enabled} size="lg" />
        <p class="text-lg">{configure.enabled ? "Enabled" : "Disabled"}</p>
      </div>
    </div>

    <div class="p-4 pt-6">
      <fieldset>
        <legend>Feed Options</legend>
        <div class="flex gap-1 items-center">
          <input type="checkbox" id="hideSlop" bind:checked={configure.hideSlop}/>
          <label for="hideSlop">Hide AI Slop (when detected)</label>
        </div>
        <div class="flex gap-1 items-center">
          <input type="checkbox" id="hideShorts" bind:checked={configure.hideShorts} />
          <label for="hideShorts">Hide Youtube Shorts</label>
        </div>
        <div class="flex gap-1 items-center">
          <input type="checkbox" id="hideAds" bind:checked={configure.hideAdsSlot}/>
          <label for="hideAds">Hide Sponsors</label>
        </div>
      </fieldset>
    </div>

    <!-- Client ID -->
    <div class="p-5">
      <!-- <h1>{clientID}</h1> -->
    </div>

    <!-- Logo -->
    <div class="pt-0 flex justify-center">
      <button onclick={() => (catPressed = !catPressed)} class="h-36">
        <img
          class="w-36 {catPressed
            ? 'h-25 w-50 translate-y-6'
            : 'h-36'} {!configure.enabled && 'grayscale'}"
          src={logo}
          alt="Cat poking a slop object logo"
        />
      </button>
    </div>
  </div>
</main>

<footer class="p-4">
  <h2 class="">version {browser.runtime.getManifest().version}</h2>
</footer>

<style>
</style>
