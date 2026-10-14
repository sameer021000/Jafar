// ApiService.js
// Centralized Axios wrapper for JafarsShop.
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || '';

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generic GET request.
 * @param {string} url - endpoint relative to baseURL.
 * @param {object} [config] - optional Axios config.
 */
export const get = async (url, config = {}) => {
  try {
    const response = await client.get(url, config);
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

/**
 * Generic POST request.
 * @param {string} url - endpoint relative to baseURL.
 * @param {object} data - payload.
 * @param {object} [config] - optional Axios config.
 */
export const post = async (url, data, config = {}) => {
  try {
    const response = await client.post(url, data, config);
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

/**
 * Normalizes Axios errors into a consistent shape.
 */
const formatError = (error) => {
  if (error.response) {
    // Server responded with a status outside 2xx
    const { status, data } = error.response;
    return {
      message: data?.message || 'Server error',
      status,
      fieldErrors: data?.errors || null,
    };
  }
  if (error.request) {
    // No response received
    return { message: 'No response from server', status: null, fieldErrors: null };
  }
  // Something else triggered the error
  return { message: error.message, status: null, fieldErrors: null };
};

export default { get, post };
