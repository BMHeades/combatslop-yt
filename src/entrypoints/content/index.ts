import { feedPage } from "./feedPage";
import { searchPage } from "./searchPage";
import { watchPage } from "./watchPage";
import '@/assets/tailwind.css'

export const settingsStorage = storage.defineItem<Settings>('sync:settings');

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  registration: 'manifest', // makes the permission not optional
  cssInjectionMode: 'ui', // needed to make tailwind work 
  main(ctx) {

    // injection on initial visit
    let cleanUp = router(ctx, new URL(location.href))

    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      // const path = newUrl.pathname
      if (cleanUp) cleanUp()

      cleanUp = router(ctx, newUrl)

    })

    // ctx.addEventListener(document, 'click', (e) => {
    //     const home = (e.target as Element).closest('a[href="/"]');
    //     if (!home) return;

    //     console.log("Home clicked");
    //     ctx.setTimeout(() => {
    //       processExistingCards(ctx)

    //     }, 1500);
    //   },
    //   true
    // )
   

    // Make all images grey scale
    const greyScaleImg = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'head',
      onMount: (container) => {
        const style = document.createElement('style')
        style.textContent =
          // 'img{ filter: grayscale(100%) blur(8px); }'
          'img{ filter: grayscale(100%) }'
        container.append(style);
      },
    });

    settingsStorage.getValue().then(settings => {
      if (settings?.greyScaleImgs) {
        greyScaleImg.mount();
      }
    })

  },
});

// returns clean up function
function router(ctx: any, url: URL) {
  const path = url.pathname

  // Search Page
  if (path.startsWith("/results")) {
    return searchPage(ctx)
  }

  // Video Page
  if (path.startsWith("/watch")) {
    return watchPage(ctx, url)
  }

  // Channel Page
  if (path.startsWith("/@")) {
    return feedPage(ctx)
  }
  // Shorts Page
  if (path.startsWith("/shorts")) {
    return
  }

  // Home Feed
  if (path === "/") {
    return feedPage(ctx)
  }
}

