

export const isCardAds = (card: HTMLElement): boolean => {
    if(card.querySelector('ytd-ad-slot-renderer')) return true
    return false
}

export const isCardPlaylist = (card: HTMLElement): boolean => {
    if(card.querySelector("yt-collection-thumbnail-view-model")) return true
    return false
}

export const isCardShorts = (card: HTMLElement): boolean => {
    if(card.querySelector("ytm-shorts-lockup-view-model")) return true
    return false
}

