
import App from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';


const injectedUIs: any[] = []

export const homePage = (ctx: any) => {
  const cardSelector: string = ".ytd-rich-item-renderer > yt-lockup-view-model"
  const linkSelector: string = "a.ytLockupViewModelContentImage"
  const seen = new WeakSet();
  const ids = new Set();


  console.log("Home page injection started")
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
          message: id
        }).then((data: ScannedSlop) => {

          // if slop detected
          if (data.isSlop === 'unknown') return

          injectIndicatorUI(ctx, card, id, data.isSlop)

        })

        // const title = card?.querySelectorAll('span.ytAttributedStringHost.ytAttributedStringWhiteSpacePreWrap')[0]
        // if (title?.textContent) {
        //   console.log(title.textContent.trim());
        // }
      }
    }
  }

  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        // updateTitles();

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

  document
    .querySelectorAll(cardSelector)
    .forEach(processVideo);


  // clean up
  return () => {
    observer.disconnect()
    ids.clear()
    injectedUIs.forEach((ui: any) => ui.remove())
    console.log("Home page injection cleaned up!")
  }
}


async function injectIndicatorUI(ctx: any, anchor: any, id: any, isSlop: boolean) {

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
}