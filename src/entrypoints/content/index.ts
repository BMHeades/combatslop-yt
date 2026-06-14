import { homePage } from "./homePage";

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main(ctx) {

    // injection on initial visit
    let cleanUp = router(ctx, location.pathname)

    ctx.addEventListener(window, 'wxt:locationchange', ({newUrl})=>{
      const path = newUrl.pathname
      if(cleanUp) cleanUp()
      
      cleanUp = router(ctx, path)

    })

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
    greyScaleImg.mount();
    
  },
});

// returns clean up function
function router(ctx: any, path: string){
  if(path.startsWith("/results")){

    return
  }

  if(path.startsWith("/watch")){
    return
  }

  return homePage(ctx)
}

