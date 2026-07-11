import { mountIndicator } from "@/lib/components";

const processFeedCard = (ctx: any, config: Config, card: Element, anchorSelector: string, linkSelector: string, append: "last" | "after" = 'last') => {
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
        const ui = mountIndicator(ctx, card.querySelector(anchorSelector)!, id, data.isSlop, append)
      })
    }
  }
  console.log("proccessed")
}

export const feedScanner = (ctx: any, config: Config, cardSelector: string, anchorSelector: string, linkSelector: string) => {
  console.log("started scanning!")
  const newCardsObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element){
          if (node.matches(cardSelector)) {
              processFeedCard(ctx, config, node, anchorSelector, linkSelector)
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
    console.log("stopped scanning!")

  }
}