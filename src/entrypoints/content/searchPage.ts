
import App from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';


const injectedUIs: any[] = []

export const searchPage = (ctx: any) => {
  const cardSelector: string = "ytd-video-renderer > .ytd-video-renderer#dismissible"
  const linkSelector: string = "#video-title"
  const seen = new Set();
  const ids = new Set();

  // initial run
  console.log("Search page injection started")

  window.addEventListener('yt-navigate-finish', onNavigate);
  function onNavigate() {
    console.log('page loaded');
    document.querySelectorAll(cardSelector).forEach(processVideo);

  }


  function processVideo(video: Element) {
    if (seen.has(video)) return
    seen.add(video)
    const card = video.querySelector(cardSelector);
    const link = card?.querySelector(linkSelector);

    if (link) {
      const id = link?.getAttribute('href')?.match(/[?&]v=([^&]+)/)?.[1]
      if (id) {

        if (ids.has(id)) return

        ids.add(id)

        console.log(id)
        browser.runtime.sendMessage({
          type: "batchCheck",
          id
        }).then((data: ScannedSlop) => {

          // if slop detected
          if (data.isSlop === 2) return

          injectIndicatorUI(ctx, card, id, data.isSlop)

        })
      }
    }
  }

  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        processVideo(node)
      })
    }
  })
  observer.observe(document.body,
    {
      childList: true,
      subtree: true,
    }
  )

  // clean up
  return () => {
    window.removeEventListener('yt-navigate-finish', onNavigate);

    observer.disconnect()
    // seen.clear()
    // ids.clear()
    // injectedUIs.forEach((ui: any) => ui.remove())
    console.log("Search page injection cleaned up!")
  }
}


async function injectIndicatorUI(ctx: any, anchor: any, id: any, isSlop: 0 | 1) {

  const ui = await createShadowRootUi(ctx, {
    name: 'slop-indicator',
    position: 'inline',
    append: "after",
    anchor: anchor.querySelector(".text-wrapper.style-scope.ytd-video-renderer>#meta"),
    onMount(container) {
      return mount(App, {
        target: container,
        props: {
          id,
          isSlop
        }
      })
    },
    onRemove(app) {
      if (app) unmount(app)
    }
  });
  // 4. Mount the UI
  ui.mount();
  injectedUIs.push(ui)
}