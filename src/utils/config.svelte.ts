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
    
    get hideSlop(){
        return config.hideSlop
    },
    set hideSlop(v){
        config.hideSlop = v
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
    }
}





