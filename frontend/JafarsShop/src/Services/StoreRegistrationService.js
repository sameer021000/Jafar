// StoreRegistrationService.js
// Placeholder service for store registration – currently not connected to a backend.
// The function throws an error to make it clear that the endpoint is not implemented.

/**
 * Simulates a store registration request.
 * @param {object} registrationData - the data collected from the Sign‑Up form.
 * @returns {Promise<never>} always rejects with a not‑implemented error.
 */
export const registerStore = async (registrationData) => {
  // In a real implementation this would POST to an API endpoint, e.g.:
  // return ApiService.post('/stores/register', registrationData);
  // For now we deliberately reject to signal the missing backend.
  const error = new Error(
    'Store registration is not yet connected to the backend. This placeholder will be replaced when the API is available.'
  );
  error.code = 'NOT_IMPLEMENTED';
  throw error;
};

export default { registerStore };
