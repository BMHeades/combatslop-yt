
import App from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';
import { settingsStorage } from '.';


const injectedUIs: any[] = []

export const feedPage = (ctx: any) => {
  const cardSelector: string = ".ytd-rich-item-renderer > yt-lockup-view-model"
  const linkSelector: string = "a.ytLockupViewModelContentImage"
  const seen = new Set();
  const ids = new Set();

  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        processVideo(node)
      })
    }
  })

  function onNavigate() {
        console.log('page loaded');
        document.querySelectorAll(cardSelector).forEach(processVideo);
  }

  settingsStorage.getValue().then(settings => {
    if (settings?.scanOnHomePage) {
      // initial run
      console.log("Feed injection started")

      window.addEventListener('yt-navigate-finish', onNavigate, {once: true});
      

      observer.observe(document.body,
        {
          childList: true,
          subtree: true,
        }
      )
    }
  })

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

        // console.log(id)
        browser.runtime.sendMessage({
          type: "batchCheck",
          id
        }).then((data: ScannedSlop) => {

          // if slop detected
          if (data.isSlop === 2) return
          // console.log(data.isSlop)
          injectIndicatorUI(ctx, card, id, data.isSlop)

        })
      }
    }
  }



  // clean up
  return () => {
    window.removeEventListener('yt-navigate-finish', onNavigate);

    observer.disconnect()
    // seen.clear()
    // ids.clear()
    // injectedUIs.forEach((ui: any) => ui.remove())
    console.log("Feed injection cleaned up!")
  }
}


async function injectIndicatorUI(ctx: any, anchor: any, id: any, isSlop: 0 | 1) {

  const ui = await createShadowRootUi(ctx, {
    name: 'slop-indicator',
    position: 'inline',
    anchor: anchor.querySelector(".ytLockupMetadataViewModelTextContainer"),
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