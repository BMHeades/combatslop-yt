export const defaultConfig: Config = {
    enabled: true,
    // displayMode: 'label'
    hideSlop: false,
    hideShorts: false,
    hideAdsSlot: false,
    hideMovies: false,
    showOnlyGems: false,
    debugMode: false
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