/**
 * ApiService.js
 * Central HTTP client for JafarAdmin using Axios.
 * All requests flow through this module.
 * Base URL is driven by REACT_APP_API_URL environment variable.
 */

import axios from 'axios';

// Ensure the base URL ends without a trailing slash to avoid double slashes when concatenating.
const BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');

/**
 * Helper to create an Axios config object.
 */
const createConfig = (token) => {
  const config = {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

/**
 * Sends a POST request to the given endpoint with a JSON body.
 *
 * @param {string} endpoint - API path (e.g., '/admin/adminLogin')
 * @param {object} body - Request payload
 * @param {string|null} [token=null] - Optional Bearer JWT token
 * @returns {Promise<object>} Parsed JSON response body
 * @throws {Error} Structured error containing `message`, `status`, and optional `fieldErrors`
 */
export const post = async (endpoint, body, token = null) => {
  try {
    const response = await axios.post(endpoint, body, createConfig(token));
    return response.data;
  } catch (err) {
    // Axios wraps server errors; expose a clean error object for callers.
    const message = err.response?.data?.Message || err.message || 'Network error';
    const error = new Error(message);
    error.status = err.response?.status || null;
    error.fieldErrors = err.response?.data?.FieldErrors || null;
    throw error;
  }
};

/**
 * Sends a GET request to the given endpoint.
 *
 * @param {string} endpoint - API path (e.g., '/admin/adminTokenVerification')
 * @param {string|null} [token=null] - Optional Bearer JWT token
 * @returns {Promise<object>} Parsed JSON response body
 * @throws {Error} Structured error containing `message` and `status`
 */
export const get = async (endpoint, token = null) => {
  try {
    const response = await axios.get(endpoint, createConfig(token));
    return response.data;
  } catch (err) {
    const message = err.response?.data?.Message || err.message || 'Network error';
    const error = new Error(message);
    error.status = err.response?.status || null;
    throw error;
  }
};
