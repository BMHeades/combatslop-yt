export const defaultConfig: Config = {
    enabled: true,
    hideShorts: false,
    hideAdsSlot: false,
    hideMovies: false,
    debugMode: false,
    mode: 0,
    hideSlop: false,
    showOnlyGems: false,
}

export const configStorage = storage.defineItem<Config>(
  'local:showChangelogOnUpdate',
  {
    fallback: defaultConfig
  },
);


export const getConfig = async (): Promise<Config> => {
    return await configStorage.getValue()
}