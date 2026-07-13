import { ContentScriptContext } from "#imports"
import { feedScanner } from "@/utils/scanners"
import { feedAnchorSelector, feedCardSelector, feedLinkSelector } from "@/utils/selectors"

// const processExistingCards = (ctx: any) => {
//   const existingCards = document.querySelectorAll(cardSelector)
//   for (const card of existingCards) {
//     processCard(ctx, card, anchorSelector, linkSelector)
//   }
// }

export const homePage = (ctx: ContentScriptContext, config: Config) => {
  return feedScanner(ctx, config, feedCardSelector, feedAnchorSelector, feedLinkSelector)
}


