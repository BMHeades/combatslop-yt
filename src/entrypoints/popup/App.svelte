<script lang="ts">
  let settings: Settings = $state({
    scanOnHomePage: true,
    scanOnSearchPage: true,
    greyScaleImgs: false
  })

  const settingsStorage = storage.defineItem<Settings>('sync:settings');
  
  onMount(async () => {
    const settingsValue = await settingsStorage.getValue()
    if(settingsValue) settings = settingsValue
  })

  $effect(() => {
    settingsStorage.setValue({
      scanOnHomePage: settings.scanOnHomePage,
      scanOnSearchPage: settings.scanOnSearchPage,
      greyScaleImgs: settings.greyScaleImgs
    })
    console.log("saved new settings")
  });
 

</script>

<main class="w-80 h-100 ">
  <div class="p-5">
    <h1 class="text-xl text-orange-200 py-3 pb-6">{browser.runtime.getManifest().name}</h1>

    <!-- <div class="flex justify-center py-5">
      <div class="flex gap-1">
        <input class="" type="checkbox" id="enabled" />
        <label for="enabled">Enabled</label>
      </div>
    </div> -->

    <fieldset class="border p-2">
      <legend>Scan on</legend>
      <div class="flex gap-1">
        <input type="checkbox" id="homepage" bind:checked={settings.scanOnHomePage} />
        <label for="homepage">Home Feed</label>
      </div>
      <div class="flex gap-1">
        <input type="checkbox" id="searchpage" bind:checked={settings.scanOnSearchPage}/>
        <label for="searchpage">Search Results</label>
      </div>
    </fieldset>
    <fieldset class="border p-2 mt-2">
      <legend>Misc</legend>
      <div class="flex gap-1">
        <input type="checkbox" id="greyscaleimg" bind:checked={settings.greyScaleImgs}/>
        <label for="greyscaleimg">B&W Images</label>
      </div>
    </fieldset>

  </div>
</main>

<footer class="p-2">
  <h2 class="">version {browser.runtime.getManifest().version}</h2>
</footer>

<style>
</style>
