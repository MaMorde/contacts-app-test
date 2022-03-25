import axios, { AxiosError, AxiosInstance } from "axios"
import { logInLink, LS_ID_TOKEN } from "src/utils/variables"

const defaultOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions)

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.isAxiosError) {
      const ae = error as AxiosError
      if (ae.response?.status === 401) {
        localStorage.removeItem(LS_ID_TOKEN)
        document.location.href = logInLink
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default instance
