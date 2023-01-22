// The service file only makes the http request and sends the data back to user and local storage.
import axios from 'axios'; // import ability to make http request

const API_URL = '/api/data/';  // sends base http request here

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)  // send user data to /api/users/

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))   // catches the return data from POST -- contains the JSON Web Token
  }

  return response.data    // return JWT
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)    // send user data to /api/users/login/

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))     // catches the return data from POST -- contains the JSON Web Token
  }

  return response.data
}

// Get current user data
const getMyData = async (token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  } 

  const response = await axios.get(API_URL + 'me', config)

  // if (response.data) {
  //   localStorage.setItem('userID', JSON.stringify(response.data))     // catches the return data from POST -- contains the JSON Web Token
  // }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getMyData,
}

export default authService;