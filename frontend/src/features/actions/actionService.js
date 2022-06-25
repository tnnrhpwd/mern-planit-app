// The service file only makes the http request and sends the data back to user and local storage.
// Exported to the Slice
import axios from 'axios';  // import ability to make http request

const API_URL = '/api/actions/';  // sends base http request here

// Create new action
const createAction = async (actionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, actionData, config)

  return response.data
}

// Get user actions
const getActions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Update user action
const updateAction = async ( actionData, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put( API_URL + actionData.id, actionData, config )

    return response.data
}

// Delete user action
const deleteAction = async (actionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + actionId, config)

  return response.data
}

const actionService = {
  createAction,
  getActions,
  updateAction,
  deleteAction,
}

export default actionService
