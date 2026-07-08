import { injectIndicator } from '@/lib/components';

// const cardSelector = "ytd-rich-item-renderer"
const cardSelector = "yt-lockup-view-model" // this one immutes on SPA rerenders
const linkSelector = "a.ytLockupViewModelContentImage"
const uis: any[] = []

const processCard = (ctx: any, card: Element) => {
  const link = card?.querySelector(linkSelector);
  if (link) {
    if (link.hasAttribute("combat-slop-processed")) {
      console.log("found processed")
      return
    }
    link.setAttribute("combat-slop-processed", "")
    const id = link?.getAttribute('href')?.match(/[?&]v=([^&]+)/)?.[1]
    if (id) {
      browser.runtime.sendMessage({
        type: "batchCheck",
        id
      }).then((data: ScannedSlop) => {
        if (data.isSlop === 2) return
        const ui = injectIndicator(ctx, card.querySelector(".ytLockupMetadataViewModelTextContainer")!, id, data.isSlop)
        uis.push(ui)
      })
    }
  }
  console.log("proccessed")
}

const processExistingCards = (ctx: any) => {
  const existingCards = document.querySelectorAll(cardSelector)
  for (const card of existingCards) {
    processCard(ctx, card)
  }
}

export const feedPage = (ctx: any) => {
  // processExistingCards(ctx)  // direct visit

  const newCardsObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element){
          // console.log(node)
          if (node.matches("yt-lockup-view-model")) {
            processCard(ctx, node)
        
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
    // uis.forEach(ui=>ui.remove())
  }
}


