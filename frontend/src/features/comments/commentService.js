// The service file only makes the http request and sends the data back to user and local storage.
// Exported to the Slice
import axios from "axios";  // import ability to make http request

const API_URL = '/api/comments/';  // sends base http request here

// Create new comment
const createComment = async ( commentData, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`,
        },
    }

    const response = await axios.post( API_URL, commentData, config )

    return response.data
}

// Get all comments
const getComments = async ( token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`,
        },
    }

    const response = await axios.get( API_URL, config )

    return response.data
}

// Update user comment
const updateComment = async ( commentID, commentData, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`,
        },
    }

    const response = await axios.update( API_URL + commentID, commentData, config )

    return response.data;
}

// Delete user commment 
const deleteComment = async ( commentID, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`,
        },
    }

    const response = await axios.delete( API_URL + commentID, config )

    return response.data
}

const commentService = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
}

export default commentService;