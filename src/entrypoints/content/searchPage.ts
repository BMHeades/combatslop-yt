import { searchPageAnchorSelector, searchPageCardSelector, searchPageLinkSelector } from "@/utils/selectors"

export const searchPage = (ctx: any, config: Config) => {

  return feedScanner(ctx, config, searchPageCardSelector, searchPageAnchorSelector, searchPageLinkSelector)
}


