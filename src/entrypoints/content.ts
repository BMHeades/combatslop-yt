export default defineContentScript({
  matches: ['<all_urls>'],
  main(ctx) {

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
    greyScaleImg.mount();

    // log all yt names

    const selector: string = ".ytd-rich-item-renderer > yt-lockup-view-model"
    const seen = new WeakSet();

    function processVideo(video: Element) {
      if(seen.has(video)) return

      seen.add(video)
      const card = video.querySelector(selector);
      const link = card?.querySelector('a.ytLockupViewModelContentImage');

      if(link){
        const id = link?.getAttribute('href')?.match(/[?&]v=([^&]+)/)?.[1]
        if(id) console.log(id)
      } 

      const title = card?.querySelectorAll('span.ytAttributedStringHost.ytAttributedStringWhiteSpacePreWrap')[0]
      if (title?.textContent) {
        console.log(title.textContent.trim());
      }

      // const id = video.querySelector(selector)?.querySelector('a.ytLockupViewModelContentImage')?.getAttribute('href')?.match(/[?&]v=([^&]+)/)?.[1]
      // if(id){
      //    if (seen.has({id})) return

      //   seen.add({id})
      //   console.log(id)
      // }
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

    document
      .querySelectorAll(selector)
      .forEach(processVideo);
  },
});
