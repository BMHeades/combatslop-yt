const cardSelector = "ytd-video-renderer > .ytd-video-renderer#dismissible"
const linkSelector = "#video-title"
const anchorSelector = ".text-wrapper.style-scope.ytd-video-renderer>#meta"

export const searchPage = (ctx: any, config: Config) => {

  return feedScanner(ctx, config, cardSelector, anchorSelector, linkSelector)
}


