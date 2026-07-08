import { mountIndicator } from "@/lib/components";

export const processCard = (ctx: any, card: Element, anchorSelector: string, linkSelector: string, append: "last" | "after" = 'last') => {
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