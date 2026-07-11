import { defaultConfig, configStorage } from "./config"

// configure for popup
let config: Config = $state(defaultConfig)
config = await configStorage.getValue()
configStorage.getValue().then(v => config = v)

export const configure = {
    get enabled(){
        return config.enabled
    },
    set enabled(v){
        config.enabled = v
        configStorage.setValue(config)
        console.log("config updated")
    },
    
    get displayMode(){
        return config.displayMode
    },
    set displayMode(v){
        config.displayMode = v
        configStorage.setValue(config)
        console.log("config updated")
    }
}





