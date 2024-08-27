export const BASE_URL = process.env.REACT_APP_API_URL;

export const API = {
  // auth
  login: `${BASE_URL}/api/login`,
  logout: `${BASE_URL}/api/logout`,
  signup: `${BASE_URL}/api/register`,
  verifyMail: `${BASE_URL}/api/verify-email`,
  verifyLoginMail: `${BASE_URL}/api/verify-login-otp`,
  getCoins: `${BASE_URL}/api/cryptocurrencies`,

  resendOTP: `${BASE_URL}/api/resend-verification-code`,
  resendLoginOTP: `${BASE_URL}/api/resend-login-otp`,
  forgotPassword: `${BASE_URL}/api/forgot-password`,
  resetPassword : `${BASE_URL}/api/reset-password`,
  getUserDetails : `${BASE_URL}/api/user/profile`,
  userPreferences : `${BASE_URL}/api/user/preferences`,
  generateWalletAddresses: `${BASE_URL}/api/wallet-addresses`,
  verifyKyc: `${BASE_URL}/api/kyc/1/verify`,
  checkKycStatus: `${BASE_URL}/api/check-verification-status`,
  getWalletAddress: (coin:string, network:string) => `${BASE_URL}/api/wallet-address?crypto_type=${coin}&network=${network}`
};