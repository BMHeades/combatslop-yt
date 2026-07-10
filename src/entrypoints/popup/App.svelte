<script lang="ts">
  import logo from "@/assets/logo.png";
  import { configure } from "@/utils/config.svelte";
  import Toggle from "@/lib/Toggle.svelte";

  // easter egg
  let catPressed = $state(false);
</script>

<main class="w-80 h-130 accent-amber-600">
  <div class="p-4">
    <!-- Title -->
    <div class="">
      <a href="https://combatslop.com/">
        <h1 class="text-2xl font pt-8 pb-10 text-center tracking-tight">
        COMBAT SLOP
        <!-- {browser.runtime.getManifest().name} -->
          <b class="text-amber-500">BETA</b>
        </h1>
      </a>
      
      <div class="flex flex-col  items-center gap-4">
        <Toggle bind:checkedToggle={configure.enabled} size='lg' />
        <p class="text-lg">{configure.enabled? "Enabled" : "Disabled"}</p>
      </div>
      
    </div>

    <!-- Client ID -->
    <div class="p-5">
      <!-- <h1>{clientID}</h1> -->
    </div>

    <!-- Logo -->
    <div class="pt-0 flex justify-center">
      <button onclick={() => (catPressed = !catPressed)} class="h-36">
        <img
          class="w-36 {catPressed ? 'h-25 w-50 translate-y-6' : 'h-36'} {!configure.enabled && "grayscale"}"
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
