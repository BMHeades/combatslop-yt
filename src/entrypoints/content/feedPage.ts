// const cardSelector = "ytd-rich-item-renderer"
const cardSelector = "yt-lockup-view-model" // this one immutes on SPA rerenders
const linkSelector = "a.ytLockupViewModelContentImage"
const anchorSelector = ".ytLockupMetadataViewModelTextContainer"

const processExistingCards = (ctx: any) => {
  const existingCards = document.querySelectorAll(cardSelector)
  for (const card of existingCards) {
    processCard(ctx, card, anchorSelector, linkSelector)
  }
}

export const feedPage = (ctx: any) => {
  // processExistingCards(ctx)  // direct visit

  const newCardsObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element){
          if (node.matches(cardSelector)) {
              processCard(ctx, node, anchorSelector, linkSelector)
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


