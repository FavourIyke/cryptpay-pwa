import { validate } from 'multicoin-address-validator';
import { toast } from 'react-hot-toast';

// Supported network types for selected coins
const NETWORKS = {
  BTC: 'bitcoin',
  USDT: {
    ERC20: 'ethereum',
    BEP20: 'binance',
    TRC20: 'tron',
  },
  ETH: {
    ERC20: 'ethereum',
    BEP20: 'binance',
  },
  SOL: 'solana',
  TRX: 'tron',
};

// General wallet address validation function
export const validateWalletAddress = (
  address: string,
  coin: string,
  network?: string
) => {
  try {
    const coinName = coin?.toLowerCase();
    const normalizedNetwork = network?.toLowerCase() || '';

    switch (coinName) {
      case 'btc':
        return validateBTCAddress(address);

      case 'usdt':
        return validateUSDTAddress(address, normalizedNetwork);

      case 'eth':
        return validateETHAddress(address, normalizedNetwork);

      case 'sol':
        return validateSOLAddress(address);

      case 'trx':
        return validateTRC20Address(address);

      default:
        toast.error('Unsupported coin type.');
        return false;
    }
  } catch (error) {
    toast.error('Validation failed. Please try again.');
    console.error(error);
    return false;
  }
};

// BTC address validation
export const validateBTCAddress = (address: string) => {
  const btcRegex = /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/;
  return btcRegex.test(address);
};

// USDT address validation
export const validateUSDTAddress = (address: string, network: string) => {
  switch (network) {
    case 'erc20':
      return validateERC20Address(address);
    case 'bep20':
      return validateBEP20Address(address);
    case 'trc20':
      return validateTRC20Address(address);
    default:
      toast.error('Invalid USDT network.');
      return false;
  }
};

// ETH address validation
export const validateETHAddress = (address: string, network: string) => {
  switch (network) {
    case 'erc20':
      return validateERC20Address(address);
    case 'bep20':
      return validateBEP20Address(address);
    default:
      toast.error('Invalid ETH network.');
      return false;
  }
};

// SOL address validation (Solana network)
export const validateSOLAddress = (address: string) => {
  const solRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return solRegex.test(address);
};

// ERC-20 address validation (Ethereum)
export const validateERC20Address = (address: string) => {
  const erc20Regex = /^(0x)?[a-fA-F0-9]{40}$/;
  return erc20Regex.test(address);
};

// BEP-20 address validation (Binance Smart Chain)
export const validateBEP20Address = (address: string) => {
  const bep20Regex = /^(0x)?[a-fA-F0-9]{40}$/;
  return bep20Regex.test(address);
};

// TRC-20 address validation (Tron network)
export const validateTRC20Address = (address: string) => {
  const trc20Regex = /^T[0-9a-zA-Z]{33}$/;
  return trc20Regex.test(address);
};
