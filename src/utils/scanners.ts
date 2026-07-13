import { mountIndicator } from "@/lib/components";
import { adsCardSelector, movieCardSelector, richItemRendererSelector, shortsSectionSelector } from "./selectors";

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
      
      if(config.debugMode){
          mountIndicator(ctx, card.querySelector(anchorSelector)!, id, Math.random() < 0.5? 0 : 1, append)
          return
      }
      
      const richItemRenderer = card.closest(richItemRendererSelector) as HTMLElement | null

      if(config.mode === 2) {
        richItemRenderer?.style.setProperty('display', 'none');
      }

      browser.runtime.sendMessage({
        type: "batchCheck",
        id
      }).then((data: ScannedSlop) => {
        if (data.isSlop !== 2){
          mountIndicator(ctx, card.querySelector(anchorSelector)!, id, data.isSlop, append)
          
          if(config.mode === 2 && data.isSlop === 0){
            richItemRenderer?.style.setProperty('display', '');
            return
          }

          // hide slop
          if(config.mode === 1 && data.isSlop === 1){
            richItemRenderer?.style.setProperty('display', 'none');
          }
        }
      })
      
    }
  }
  console.log("proccessed")
}

export const feedScanner = (ctx: any, config: Config, cardSelector: string, anchorSelector: string, linkSelector: string) => {

  // process existing cards
  const existingCards = document.querySelectorAll(cardSelector)
  for (const card of existingCards) {
    console.log(card)
    processFeedCard(ctx, config, card, anchorSelector, linkSelector)
  }

  console.log("started scanning!")
  const newCardsObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element){
          
          // if(node.matches('ytm-rich-item-renderer')) console.log(node)
          // if(node.matches('yt-lockup-view-model')) console.log(node)

          if(config.hideShorts){
            // shorts section
            if(node.matches(shortsSectionSelector)) (node as HTMLElement | null)?.style.setProperty('display', 'none');
          }

          if(config.hideAdsSlot){
            // ad slots
            if(node.matches(adsCardSelector)) (node.closest(richItemRendererSelector) as HTMLElement | null)?.style.setProperty('display', 'none');
          }

          if(config.hideMovies){
            // hide movies
            if(node.matches(movieCardSelector)) (node.closest(richItemRendererSelector) as HTMLElement | null)?.style.setProperty('display', 'none');
          }

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