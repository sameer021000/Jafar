/**
 * Mock Administrator Credentials and Authentication Simulation
 * 
 * NOTE: For frontend demonstration and evaluation purposes only.
 * This does not represent production authentication security.
 */

export const MOCK_ADMIN_ACCOUNTS = [
  {
    id: 'admin',
    password: 'admin',
    name: 'Sameer Shaik',
    role: 'Chief Administrative Officer',
    email: 'admin@jafarjewelry.com',
    avatarInitials: 'SS',
  },
  {
    id: 'jafar_admin',
    password: 'jafar',
    name: 'Jafar Operations Lead',
    role: 'Verification Manager',
    email: 'ops@jafarjewelry.com',
    avatarInitials: 'JO',
  },
];

/**
 * Simulates credential verification with a realistic asynchronous latency.
 * Does not silently modify passwords.
 * 
 * @param {string} adminId 
 * @param {string} password 
 * @returns {Promise<{ success: boolean, message?: string, admin?: object }>}
 */
export const authenticateAdmin = (adminId, password) => {
  return new Promise((resolve) => {
    // Simulate slight asynchronous processing latency (400ms)
    setTimeout(() => {
      const matchedAccount = MOCK_ADMIN_ACCOUNTS.find(
        (account) => account.id === adminId && account.password === password
      );

      if (matchedAccount) {
        // Return public profile metadata without exposing credential secrets
        const { password: _, ...safeAdminProfile } = matchedAccount;
        resolve({
          success: true,
          admin: safeAdminProfile,
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid Admin ID or password. Please verify your credentials.',
        });
      }
    }, 450);
  });
};
