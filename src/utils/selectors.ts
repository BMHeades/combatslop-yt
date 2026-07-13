
export const isMobile = location.hostname === "m.youtube.com";

if(isMobile) console.log("mobile detected")

export const richItemRendererSelector = isMobile? "ytm-rich-item-renderer" : "ytd-rich-item-renderer"

export const feedCardSelector = isMobile? "ytm-rich-item-renderer" : "yt-lockup-view-model" /* this one immutes on SPA rerenders */
export const feedAnchorSelector = isMobile? "" : ".ytLockupMetadataViewModelTextContainer"
export const feedLinkSelector = isMobile? "" : "a.ytLockupViewModelContentImage"

export const searchPageCardSelector = isMobile? "" : "ytd-video-renderer > .ytd-video-renderer#dismissible"
export const searchPageAnchorSelector = isMobile? "" : ".text-wrapper.style-scope.ytd-video-renderer>#meta"
export const searchPageLinkSelector = isMobile? "" : "#video-title"

export const watchPageAnchorIndicator = isMobile? "" : "yt-lockup-view-model"

export const shortsSectionSelector = isMobile? "" : "ytd-rich-section-renderer"
export const adsCardSelector = isMobile? "" : "ytd-ad-slot-renderer"
export const movieCardSelector = isMobile? "" : "ytd-rich-grid-media"
