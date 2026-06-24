<script lang="ts">
  let scanOnHomePage: boolean = $state(true);
  let scanOnSearchPage: boolean = $state(true);

  storage.getItem<boolean>("sync:scan_on_homepage").then((item) => {
    if (item !== null) {
      scanOnHomePage = item;
    }
  });
  storage.getItem<boolean>("sync:scan_on_searchpage").then((item) => {
    if (item !== null) {
      scanOnSearchPage = item;
    }
  });

  $effect(() => {
    storage.setItem("sync:scan_on_homepage", scanOnHomePage);
  });
  $effect(() => {
    storage.setItem("sync:scan_on_searchpage", scanOnSearchPage);
  });


</script>

<main class="w-80 h-100">
  <div class="p-5">
    <h1 class="text-xl">{browser.runtime.getManifest().name}</h1>

    <div class="flex justify-center py-5">
      <div class="flex gap-1">
        <input class="" type="checkbox" id="enabled" />
        <label for="enabled">Enabled</label>
      </div>
    </div>

    <fieldset class="border p-2">
      <legend>Scan on</legend>
      <div class="flex gap-1">
        <input type="checkbox" id="homepage" bind:checked={scanOnHomePage} />
        <label for="homepage">Home Feed</label>
      </div>
      <div class="flex gap-1">
        <input type="checkbox" id="searchpage" bind:checked={scanOnSearchPage}/>
        <label for="searchpage">Search Results</label>
      </div>
    </fieldset>
    <fieldset class="border p-2">
      <legend>Misc</legend>
      <div class="flex gap-1">
        <input type="checkbox" id="greyscaleimg" />
        <label for="greyscaleimg">B&W Images</label>
      </div>
    </fieldset>
  </div>
</main>

<footer>
  <h2 class="">version {browser.runtime.getManifest().version}</h2>
</footer>

<style>
</style>
