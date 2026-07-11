export { }

declare global {
    interface ScannedSlop {
        isSlop: 0 | 1 | 2
    }

    interface Config {
        enabled: boolean
    }
}

