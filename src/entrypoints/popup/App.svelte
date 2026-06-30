<script lang="ts">
  import logo from "@/assets/logo.png";

  let settings: Settings = $state({
    scanOnHomePage: true,
    scanOnSearchPage: true,
    greyScaleImgs: false,
  });

  let clientID: null | string = $state("");
  const settingsStorage = storage.defineItem<Settings>("sync:settings");

  onMount(async () => {
    const settingsValue = await settingsStorage.getValue();
    if (settingsValue) settings = settingsValue;

    clientID = await storage.getItem("sync:client_id");
  });

  $effect(() => {
    settingsStorage.setValue({
      scanOnHomePage: settings.scanOnHomePage,
      scanOnSearchPage: settings.scanOnSearchPage,
      greyScaleImgs: settings.greyScaleImgs,
    });
    console.log("saved new settings");
  });

  // easter egg
  let catPressed = $state(false);
</script>

<main class="w-80 h-130 accent-amber-600">
  <div class="p-4">

    <!-- Title -->
    <div class="">
      <h1 class="text-xl font pt-8 pb-10 text-center">
        {browser.runtime.getManifest().name}
        <b class="text-amber-500">BETA</b>
      </h1>
    </div>

    <!-- Settings Scan on -->
    <fieldset class="pb-4 px-5">
      <legend>Scan on</legend>
      <div class="flex gap-1">
        <input
          type="checkbox"
          id="homepage"
          bind:checked={settings.scanOnHomePage}
        />
        <label for="homepage">Home Feed</label>
      </div>
      <div class="flex gap-1">
        <input
          type="checkbox"
          id="searchpage"
          bind:checked={settings.scanOnSearchPage}
        />
        <label for="searchpage">Search Results</label>
      </div>
    </fieldset>

    <br />
    <!-- Settings misc -->
    <fieldset class="pb-4 px-5 mt-2">
      <legend>Misc</legend>
      <div class="flex gap-1">
        <input
          type="checkbox"
          id="greyscaleimg"
          bind:checked={settings.greyScaleImgs}
        />
        <label for="greyscaleimg">B&W Images</label>
      </div>
    </fieldset>

    <!-- Client ID -->
    <div class="p-5">
      <!-- <h1>{clientID}</h1> -->
    </div>

    <!-- Logo -->
    <div class="pt-0 flex justify-center">
      <button onclick={() => (catPressed = !catPressed)} class="h-36">
        <img
          class="w-36 {catPressed ? 'h-25 w-50 translate-y-6' : 'h-36'}"
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
