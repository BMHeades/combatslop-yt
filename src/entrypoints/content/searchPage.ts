const cardSelector = "ytd-video-renderer > .ytd-video-renderer#dismissible"
const linkSelector = "#video-title"
const anchorSelector = ".text-wrapper.style-scope.ytd-video-renderer>#meta"

export const searchPage = (ctx: any) => {
  const newCardsObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element){
            if (node.matches(cardSelector)) {
                processCard(ctx, node, anchorSelector, linkSelector, 'after')
            }
          }
        })
      }
    })
  
    newCardsObserver.observe(document.body,
      {
        childList: true,
        subtree: true,
      }
    )
  
    // clean up
    return () => {
      newCardsObserver.disconnect()
    }
}


