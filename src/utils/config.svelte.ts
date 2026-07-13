import { defaultConfig, configStorage } from "./config"

// configure for popup
let config: Config = $state(defaultConfig)
config = await configStorage.getValue()

export const configure = {
    get enabled(){
        return config.enabled
    },
    set enabled(v){
        config.enabled = v
        configStorage.setValue({...config})
        console.log("config updated")
    },
    
    get hideShorts(){
        return config.hideShorts
    },
    set hideShorts(v){
        config.hideShorts = v
        configStorage.setValue({...config})
        console.log("config updated")
    },

    get hideAdsSlot(){
        return config.hideAdsSlot
    },
    set hideAdsSlot(v){
        config.hideAdsSlot = v
        configStorage.setValue({...config})
        console.log("config updated")
    },
    
    get hideMovies(){
        return config.hideMovies
    },
    set hideMovies(v){
        config.hideMovies = v
        configStorage.setValue({...config})
        console.log("config updated")
    },

    get debugMode(){
        return config.debugMode
    },
    set debugMode(v){
        config.debugMode = v
        configStorage.setValue({...config})
        console.log("config updated")
    },
    // get hideSlop(){
    //     return config.hideSlop
    // },
    // set hideSlop(v){
    //     config.hideSlop = v
    //     configStorage.setValue({...config})
    //     console.log("config updated")
    // },
    // get showOnlyGems(){
    //     return config.showOnlyGems
    // },
    // set showOnlyGems(v){
    //     config.showOnlyGems = v
    //     configStorage.setValue({...config})
    //     console.log("config updated")
    // },

    get mode(){
        return config.mode
    },
    set mode(v){
        config.mode = v
        configStorage.setValue({...config})
        console.log("config updated")
    }
}





