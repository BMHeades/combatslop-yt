import { processCard } from "@/utils/processCard"

// const cardSelector = "ytd-rich-item-renderer"
const cardSelector = "yt-lockup-view-model" // this one immutes on SPA rerenders
const linkSelector = "a.ytLockupViewModelContentImage"

const processExistingCards = (ctx: any) => {
  const existingCards = document.querySelectorAll(cardSelector)
  for (const card of existingCards) {
    processCard(ctx, card, linkSelector)
  }
}

export const feedPage = (ctx: any) => {
  // processExistingCards(ctx)  // direct visit

  const newCardsObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element){
          if (node.matches("yt-lockup-view-model")) {
              processCard(ctx, node, linkSelector)
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


