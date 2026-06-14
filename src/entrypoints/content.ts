

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
          'img{ filter: grayscale(100%) blur(8px); }'
        // 'img{ filter: grayscale(100%) }'
        container.append(style);
      },
    });
    greyScaleImg.mount();

    // log all yt names

    const cardSelector: string = ".ytd-rich-item-renderer > yt-lockup-view-model"
    const linkSelector: string = "a.ytLockupViewModelContentImage"
    const seen = new WeakSet();

    function processVideo(video: Element) {
      if (seen.has(video)) return

      seen.add(video)
      const card = video.querySelector(cardSelector);
      const link = card?.querySelector(linkSelector);

      if (link) {
        const id = link?.getAttribute('href')?.match(/[?&]v=([^&]+)/)?.[1]
        if (id) {
          console.log(id)
          browser.runtime.sendMessage({
            message: id
          }).then((data)=> console.log(data.message))
        } 
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


    // function updateTitles() {
    //   const titles = document.querySelectorAll('.ytLockupMetadataViewModelTitle > span.ytAttributedStringHost.ytAttributedStringWhiteSpacePreWrap')

    //   titles.forEach(title => {
    //     if (title instanceof HTMLElement) {

    //       if (!title?.dataset.ai) {
    //         const isAI = Math.random() < 0.3;
    //         if (isAI) {

    //           title.textContent = `${isAI ? "[AI] " : ""}${title.textContent}`;
    //           title.style.color = 'orange';
    //         }
    //         title.dataset.ai = 'marked';
    //       }
    //     }
    //   });
    // }

    
    
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
      .querySelectorAll(selector)
      .forEach(processVideo);
  },
});

function injectUI() {

}