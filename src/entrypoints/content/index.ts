import { homePage } from "./homePage";
import { searchPage } from "./searchPage";
import { watchPage } from "./watchPage";
import '@/assets/tailwind.css'

export const settingsStorage = storage.defineItem<Settings>('sync:settings');

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  registration: 'manifest', // makes the permission not optional
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
          'img{ filter: grayscale(100%) blur(8px); }'
          // 'img{ filter: grayscale(100%) }'
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

    // settingsStorage.getValue().then(settings => {
    //   if (!settings?.scanOnSearchPage) {
    //     return
    //   }
    // })
    return searchPage(ctx)


  }

  // Video Page
  if (path.startsWith("/watch")) {
    return watchPage(ctx, url)
  }

  // Home Feed
  if (path === "/") {
    // settingsStorage.getValue().then(settings => {
    //   if (!settings?.scanOnHomePage) {
    //     return
    //   }
      
    // })
    return homePage(ctx)
  }
}

