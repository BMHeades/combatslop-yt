export { }

declare global {
    interface ScannedSlop {
        // 0 => not slop
        // 1 => is slop
        // 2 => unknown
        isSlop: 0 | 1 | 2
    }

    interface Config {
        enabled: boolean,
        hideShorts: boolean,
        hideAdsSlot: boolean,
        hideMovies: boolean,
        
        // 0 => labels only
        // 1 => hide slops
        // 2 => show only gems
        mode: 0 | 1 | 2, 
        showOnlyGems: boolean,
        hideSlop: boolean,
        debugMode: boolean
    }
}
