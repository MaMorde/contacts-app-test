import { AxiosResponse } from "axios"
import instance from "./axios-config"

const API = "https://localhost:3000"

const responseBody = (response: AxiosResponse) => response.data

type GetParams =
  | {
      [key: string]: string
    }
  | URLSearchParams

const requests = {
  get: (url: string, params?: GetParams) =>
    instance
      .get(url, {
        params,
      })
      .then(responseBody),
  post: (url: string, body: any) => instance.post(url, body).then(responseBody),
  put: (url: string, body: Record<string, unknown>) =>
    instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
}

const get = {}

const post = {
  signIn: (email: string, password: string): Promise<any> =>
    requests
      .post(API, {
        USERNAME: email,
        PASSWORD: password,
      })
      .then((res) => res.data),
}

export { get, post }
