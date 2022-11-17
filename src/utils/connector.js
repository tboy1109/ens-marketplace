import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2",
  4: "https://rinkeby.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2"
};
const POLLING_INTERVAL = 12000;
const rpcUrl = RPC_URLS[1];//getNodeUrl();
const chainId = parseInt(1, 10);

export const injected = new InjectedConnector({ supportedChainIds: [250] });


export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
