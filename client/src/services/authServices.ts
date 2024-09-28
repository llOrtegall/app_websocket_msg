import { API_URL, APP_NAME } from '../utils/constanst'
import axios from 'axios'

const authProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, { params: { app: APP_NAME } })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

export { authProfile }