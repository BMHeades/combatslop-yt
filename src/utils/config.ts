export const defaultConfig: Config = {
    enabled: true
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