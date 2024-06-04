import axios, { AxiosRequestConfig } from 'axios'

const env = import.meta.env

export const request = <T = { code: number; data: any; msg: string }>(requestConfig: AxiosRequestConfig): Promise<T> => {
  const instance = axios.create({
    baseURL: env.VITE_APP_URL,
    timeout: 10000
  })
  
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.error(err)
    },
  )
  
  instance.interceptors.response.use(
    ({ data }) => {
      return data
    },
    (err) => {
      return Promise.reject(err)
    },
  )
  
  return instance(requestConfig) as Promise<T>
}

export const http1 = axios.create({})

