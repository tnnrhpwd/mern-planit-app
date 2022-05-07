// The service file only makes the http request and sends the data back to user and local storage.
// Exported to the Slice
import axios from 'axios';  // import ability to make http request

const API_URL = '/api/plans/';  // sends base http request here

// Create new plan
const createPlan = async (planData, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, planData, config)

    return response.data
}

// Get user plans
const getPlans = async (token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user plan
const deletePlan = async (planId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + planId, config)

    return response.data
}

const planService = {
    createPlan,
    getPlans,
    deletePlan,
}

export default planService;
