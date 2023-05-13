import axios, { AxiosError } from 'axios'
const environment = {
  BASE_URL: import.meta.env.VITE_API_URL
};

const baseFetcher = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error)
}

export default baseFetcher
