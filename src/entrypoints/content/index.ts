import { homePage } from "./homePage";
import { searchPage } from "./searchPage";
import { watchPage } from "./watchPage";
import '@/assets/tailwind.css'


export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  cssInjectionMode: 'ui',
  main(ctx) {

    // injection on initial visit
    let cleanUp = router(ctx, new URL(location.href))

    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      // const path = newUrl.pathname
      if (cleanUp) cleanUp()

      cleanUp = router(ctx, newUrl)

    })

    // manual run
    // let cleanUpHomePage = homePage(ctx)
    // let cleanUpWatchPage = watchPage(ctx, new URL(location.href))

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

    const settingsStorage = storage.defineItem<Settings>('sync:settings');
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
  if (path.startsWith("/results")) {
    return searchPage(ctx)
  }

  if (path.startsWith("/watch")) {
    return watchPage(ctx, url)
  }

  return homePage(ctx)
}

