import axios from "axios"

// Create axios instance with base URL relative to current origin
const api = axios.create({
  // Use relative URL to leverage the proxy in vite.config.js
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// For browser environments, we can't use Node's 'require'
// Instead, configure axios to not validate certificates through the proxy
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300 // Default
}

// Add request interceptor without logging
api.interceptors.request.use(
  (config) => {
    // No logging, just return the config
    return config
  },
  (error) => {
    // No logging, just reject the promise
    return Promise.reject(error)
  },
)

// Add response interceptor without logging
api.interceptors.response.use(
  (response) => {
    // No logging, just return the response
    return response
  },
  (error) => {
    // Create a more user-friendly error message without logging
    let errorMessage = "An unknown error occurred"

    if (error.response) {
      // Use the server's error message if available
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      } else {
        // Otherwise create a message based on status code
        switch (error.response.status) {
          case 400:
            errorMessage = "Bad request - please check your input"
            break
          case 401:
            errorMessage = "Unauthorized - please log in again"
            break
          case 403:
            errorMessage = "Forbidden - you don't have permission to access this resource"
            break
          case 404:
            errorMessage = "Resource not found"
            break
          case 500:
            errorMessage = "Server error - please try again later"
            break
          default:
            errorMessage = `Error ${error.response.status}: Please try again`
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response from server - please check your connection"
    } else {
      // Something happened in setting up the request
      errorMessage = error.message
    }

    // Add the error message to the error object
    error.userMessage = errorMessage

    return Promise.reject(error)
  },
)

export default api
