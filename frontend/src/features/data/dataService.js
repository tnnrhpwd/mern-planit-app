// The service file only makes the http request and sends the data back to user and local storage.
// Exported to the Slice
import axios from 'axios';  // import ability to make http request
const devMode = (process.env.NODE_ENV === 'development')

const API_URL = devMode? '/api/data': 'https://mern-plan-web-service.onrender.com/api/data/';  // sends base http request here
if (devMode) {console.log("Warning: Running in development mode. Remember to start backend.")}

// Create new data
const createData = async (dataData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    const response = await axios.post(API_URL, dataData, config)

    return response.data
}

// Get all datas
const getData = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Update user data
const updateData = async ( dataData, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put( API_URL + dataData.id, dataData, config )

    return response.data
}

// Delete user data
const deleteData = async ( dataId, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete( API_URL + dataId, config )

    return response.data
}

// Register user
const register = async (userData) => {
    console.log(API_URL + 'register')
    const response = await axios.post(API_URL + 'register', userData)  // send user data to /api/data/ -- creates a new user
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))   // catches the return data from POST -- contains the JSON Web Token -- logs user in
    }
  
    return response.data    // return JWT
}
  
// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)    // send user data to /api/data/login/
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))     // catches the return data from POST -- contains the JSON Web Token
    }

    return response.data
}
  
// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const dataService = {
    createData,
    getData,
    updateData,
    deleteData,
    register,
    login,
    logout,
}

export default dataService;
