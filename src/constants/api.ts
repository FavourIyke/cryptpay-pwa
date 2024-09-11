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
  userBanks : `${BASE_URL}/api/user-banks`,
  getAllBanks : `${BASE_URL}/api/banks`,
  getBankName : `${BASE_URL}/api/resolve-account`,
  generateWalletAddresses: `${BASE_URL}/api/wallet-addresses`,
  verifyKyc: `${BASE_URL}/api/kyc/1/verify`,
  getTransactions: `${BASE_URL}/api/transactions`,
  getSummary: `${BASE_URL}/api/total-payouts`,
  checkKycStatus: `${BASE_URL}/api/check-verification-status`,
  getWalletAddress: (coin:string, network:string) => `${BASE_URL}/api/wallet-address?crypto_type=${coin}&network=${network}`,
  setDefaultBank: (bankId:any, ) => `${BASE_URL}/api/banks/${bankId}/set-default`,
  deleteBank: (bankId:any, ) => `${BASE_URL}/api/bank/delete/${bankId}`
};