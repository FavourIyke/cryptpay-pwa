// components/GetRates.ts
import useAuthAxios from "../../utils/baseAxios";
import { API } from "../../constants/api";
import { useQuery } from "@tanstack/react-query";

// GetRates function
const GetRates = (coinName: string, type: "buy" | "sell") => {
  const axiosInstance = useAuthAxios();

  // Fetch function to get the list of cryptocurrencies
  const getRates = async () => {
    const response = await axiosInstance.get(API.getCoins);
    return response.data.data;
  };

  const { data: coins } = useQuery({
    queryKey: ["get-coins"],
    queryFn: getRates,
    retry: 1,
  });
  //   Find the specific cryptocurrency by its symbol
  const coin = coins?.cryptocurrencies?.find(
    (crypto: { symbol: string }) => crypto.symbol === coinName
  );

  //   // Return the appropriate rate based on the provided type
  return type === "buy" ? coin?.buy_rate : coin?.sell_rate;
};

export default GetRates;
