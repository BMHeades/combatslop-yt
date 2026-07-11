export { }

declare global {
    type ScannedSlop = {
        isSlop: 0 | 1 | 2
    }

    type Config = {
        enabled: boolean
    }

}