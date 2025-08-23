import { apiAxios } from "./axios"
import { AxiosError } from 'axios'

const fetcher = async (path: string) => {
  try {
    const response = await apiAxios.get(path)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Fetcher - Axios Error:', error.message)
      console.error('Fetcher - Error response:', error.response?.data)
      console.error('Fetcher - Error status:', error.response?.status)
    } else {
      console.error('Fetcher - Unknown Error:', error)
    }
    throw error
  }
}

export default fetcher
