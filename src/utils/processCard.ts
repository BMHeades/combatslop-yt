import { mountIndicator } from "@/lib/components";

export const processCard = (ctx: any, card: Element, linkSelector: string) => {
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
        const ui = mountIndicator(ctx, card.querySelector(".ytLockupMetadataViewModelTextContainer")!, id, data.isSlop)
        // uis.push(ui)
      })
    }
  }
  console.log("proccessed")
}