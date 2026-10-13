/**
 * AdminAuthService.js
 * Domain service for Admin Authentication in JafarAdmin frontend.
 * Interacts with backend API routes via ApiService.
 */

import { post, get } from '../Api/ApiService';

/**
 * Authenticates admin credentials with backend.
 * Endpoint: POST /admin/adminLogin
 *
 * @param {string} AdminID - Admin identifier
 * @param {string} Password - Admin password
 * @returns {Promise<{ Token: string, AdminID: string }>}
 */
export const login = async (AdminID, Password) => {
  const response = await post('/admin/adminLogin', {
    AdminID,
    Password,
  });

  return response.Data;
};

/**
 * Verifies if an existing JWT token is valid.
 * Endpoint: GET /admin/adminTokenVerification
 *
 * @param {string} token - Bearer JWT token
 * @returns {Promise<{ AdminID: string }>}
 */
export const verifySession = async (token) => {
  const response = await get('/admin/adminTokenVerification', token);
  return response.Admin;
};

/**
 * Graceful admin logout notification to backend.
 * Endpoint: POST /admin/adminLogout
 *
 * @param {string} [token=null] - Optional Bearer JWT token
 * @returns {Promise<object>}
 */
export const logout = async (token = null) => {
  const response = await post('/admin/adminLogout', {}, token);
  return response;
};
