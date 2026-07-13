
export const isMobile = location.hostname === "m.youtube.com";

if(isMobile) console.log("mobile detected")

export const richItemRendererSelector = isMobile? "ytm-rich-item-renderer" : "ytd-rich-item-renderer"

export const feedCardSelector = isMobile? "ytm-rich-item-renderer" : "yt-lockup-view-model" /* this one immutes on SPA rerenders */
export const feedAnchorSelector = isMobile? ".ytLockupMetadataViewModelTextContainer" : ".ytLockupMetadataViewModelTextContainer"
export const feedLinkSelector = isMobile? "a.ytLockupViewModelContentImage" : "a.ytLockupViewModelContentImage"

export const searchPageCardSelector = isMobile? "ytm-video-with-context-renderer" : "ytd-video-renderer > .ytd-video-renderer#dismissible"
export const searchPageAnchorSelector = isMobile? ".media-item-metadata" : ".text-wrapper.style-scope.ytd-video-renderer>#meta"
export const searchPageLinkSelector = isMobile? ".media-item-thumbnail-container" : "#video-title"

export const watchPageAnchorIndicator = isMobile? "#player-container-id" : "#above-the-fold>#title"

export const shortsSectionSelector = isMobile? "ytm-rich-section-renderer" : "ytd-rich-section-renderer"
export const adsCardSelector = isMobile? "" : "ytd-ad-slot-renderer"
export const movieCardSelector = isMobile? "" : "ytd-rich-grid-media"
