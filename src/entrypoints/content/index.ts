import { homePage } from "./homePage";
import { searchPage } from "./searchPage";
import { watchPage } from "./watchPage";
import '@/assets/tailwind.css'


export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  registration: 'manifest', // makes the permission not optional
  cssInjectionMode: 'ui',
  main(ctx) {

    getConfig().then(config => {
      if (config.enabled) {
        let cleanUp = router(ctx, config, new URL(location.href))

        ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
          // const path = newUrl.pathname
          if (cleanUp) cleanUp()
          cleanUp = router(ctx, config, newUrl)
        })
      }
    })



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

  },
});

// returns clean up function
function router(ctx: any, config: Config, url: URL) {
  const path = url.pathname

  // Search Page
  if (path.startsWith("/results")) {
    return searchPage(ctx, config)
  }

  // Video Page
  if (path.startsWith("/watch")) {
    return watchPage(ctx, config, url)
  }

  // Channel Page
  if (path.startsWith("/@")) {
    return homePage(ctx, config)
  }
  // Shorts Page
  if (path.startsWith("/shorts")) {
    return
  }

  // Home Feed
  if (path === "/") {
    return homePage(ctx, config)
  }
}

