export const BASE_URL = process.env.REACT_APP_API_URL;

export const API = {
  // auth
  login: `${BASE_URL}/api/login`,
  logout: `${BASE_URL}/api/logout`,
  signup: `${BASE_URL}/api/register`,
  verifyMail: `${BASE_URL}/api/verify-email`,
  setTransactionPin: `${BASE_URL}/api/set-transaction-pin`,
  verifyLoginMail: `${BASE_URL}/api/verify-login-otp`,
  getCoins: `${BASE_URL}/api/cryptocurrencies`,
  getCoinPrices: `${BASE_URL}/api/crypto-prices`,

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
  verifyKyc2: `${BASE_URL}/api/kyc/level-2/submit`,
  getIdTypes: `${BASE_URL}/api/kyc/level-2/supported-id-types`,
  getTransactions: `${BASE_URL}/api/transactions?filter=deposit,payout`,
  getWalletTransactions: `${BASE_URL}/api/transactions?filter=buy,topup`,
  getSingleTransaction: (id:string) =>  `${BASE_URL}/api/transactions/${id}`,
  getSummary: `${BASE_URL}/api/total-payouts`,
  checkKycStatus: `${BASE_URL}/api/check-verification-status`,
  getNotifications: (page: number) => `${BASE_URL}/api/notifications/all?page=${page}`,
  getUnreadNotifications: `${BASE_URL}/api/notifications/unread`,
  markAllAsRead: `${BASE_URL}/api/notifications/read-all`,
  buyCrypto: `${BASE_URL}/api/buy-crypto`,
  createPaymentAccount: `${BASE_URL}/api/create-payment-account`,
  checkPayment: `${BASE_URL}/api/check-payment-status`,
  buyCryptoConfirm: `${BASE_URL}/api/buy-crypto/confirm`,
  markOneAsRead: (id:string) => `${BASE_URL}/api/notifications/${id}/read`,
  getWalletAddress: (coin:string, network:string) => `${BASE_URL}/api/wallet-address?crypto_type=${coin}&network=${network}`,
  setDefaultBank: (bankId:any, ) => `${BASE_URL}/api/banks/${bankId}/set-default`,
  deleteBank: (bankId:any, ) => `${BASE_URL}/api/bank/delete/${bankId}`
};