import { AxiosResponse } from "axios"
import instance from "./axios-config"

const API = "http://localhost:8000"

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
  patch: (url: string, body: Record<string, unknown>) =>
    instance.patch(url, body).then(responseBody),
  put: (url: string, body: Record<string, unknown>) =>
    instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
}

const get = {
  getContacts: (): Promise<Contact[]> =>
    requests.get(`${API}/contacts`).then((res) => res),
}

const post = {
  signIn: (email: string, password: string): Promise<SignInResponse> =>
    requests
      .post(`${API}/auth/login`, {
        email,
        password,
      })
      .then((res) => res),

  createContact: (body: Contact): Promise<Contact> =>
    requests.post(`${API}/contacts`, body).then((res) => res),
}

const del = {
  deleteContact: (id: string) =>
    requests.delete(`${API}/contacts/${id}`).then((res) => res),
}

const patch = {
  editContact: (id: string, body: Contact) =>
    requests.patch(`${API}/contacts/${id}`, body).then((res) => res),
}

export { get, post, del, patch }
