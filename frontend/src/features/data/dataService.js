// The service file only makes the http request and sends the data back to user and local storage.
// Exported to the Slice
import axios from 'axios';  // import ability to make http request

const API_URL = '/api/data/';  // sends base http request here

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

const dataService = {
    createData,
    getData,
    updateData,
    deleteData,
}

export default dataService;
