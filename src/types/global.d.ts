export { }

declare global {
    type ScannedSlop = {
        isSlop: 0 | 1 | 2
    }

    type Settings = {
        scanOnHomePage: boolean,
        scanOnSearchPage: boolean,
        greyScaleImgs: boolean
    }
}