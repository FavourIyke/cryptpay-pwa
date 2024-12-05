export const paddingX = "px-4 xs:px-8 mds:px-12 md:px-28 lgss:px-28 lg:px-36  xxxl:px-[480px]"
export const getExplorerUrl = (coin: string, network: string, transactionHash: string) => {
  switch (coin) {
    case "BTC":
      return `https://www.blockchain.com/btc/tx/${transactionHash}`;
    case "ETH":
      return `https://etherscan.io/tx/${transactionHash}`;
    case "USDT":
      switch (network) {
        case "ERC-20":
          return `https://etherscan.io/tx/${transactionHash}`;
        case "TRC-20":
          return `https://tronscan.org/#/transaction/${transactionHash}`;
        case "BEP-20":
          return `https://bscscan.com/tx/${transactionHash}`;
        default:
          return "#"; // Fallback for unknown network
      }
    case "SOL":
      return `https://explorer.solana.com/tx/${transactionHash}`;
    default:
      return "#"; // Fallback if unknown coin
  }
};