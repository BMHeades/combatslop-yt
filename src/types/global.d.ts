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
        hideSlop: boolean,
        hideShorts: boolean,
        hideAdsSlot: boolean
    }
}

