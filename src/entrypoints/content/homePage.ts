import { ContentScriptContext } from "#imports"
import { feedScanner } from "@/utils/scanners"

// const cardSelector = "ytd-rich-item-renderer"
const cardSelector = "yt-lockup-view-model" // this one immutes on SPA rerenders
const linkSelector = "a.ytLockupViewModelContentImage"
const anchorSelector = ".ytLockupMetadataViewModelTextContainer"

// const processExistingCards = (ctx: any) => {
//   const existingCards = document.querySelectorAll(cardSelector)
//   for (const card of existingCards) {
//     processCard(ctx, card, anchorSelector, linkSelector)
//   }
// }

export const homePage = (ctx: ContentScriptContext, config: Config) => {
  return feedScanner(ctx, config, cardSelector, anchorSelector, linkSelector)
}


