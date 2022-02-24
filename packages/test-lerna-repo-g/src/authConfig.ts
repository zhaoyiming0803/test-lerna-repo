export interface IAuthConfig {
  appId: string
}

let authConfig:IAuthConfig = {
  appId: ''
}

export const getAuthConfig = () => authConfig

export const setAuthConfig = (config: IAuthConfig) => {
  return (authConfig = config)
}
