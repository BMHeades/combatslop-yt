import tailwind from '../../assets/tailwind.css?inline'

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
    const ids = new Set();

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
          }).then((data) => {

            // if slop detected
            if(data.isSlop){

              injectUI(ctx, card, id)
            }
          })

          const title = card?.querySelectorAll('span.ytAttributedStringHost.ytAttributedStringWhiteSpacePreWrap')[0]
          if (title?.textContent) {
            console.log(title.textContent.trim());
          }
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
  },
});

async function injectUI(ctx: any, anchor: any, id: any) {

  const ui = await createShadowRootUi(ctx, {
    name: 'slop-indicator',
    position: 'inline',
    anchor: anchor,
    onMount(container) {
     
      container.innerHTML = `
      <style>${tailwind}</style>
      <div class="bg-amber-200">
        <p>${id}</p>
      </div>
      `
    },
  });

  // 4. Mount the UI
  ui.mount();
}