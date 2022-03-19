import instance from './axios-config'

const setToken = (token: string | null): void => {
  if (!token) {
    delete instance.defaults.headers.common['Authorization']
  } else {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export default setToken
