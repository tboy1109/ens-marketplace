/* eslint-disable import/prefer-default-export */
import { ethers } from "ethers";

import AuctionRegistrarAbi from '../contracts/Nft_Marketplace.json';
import FTMBaseRegistrarAbi from '../contracts/BaseRegistrarImplementation.json';

export const AuctionRegistrarAddress = "0xde96d8e1AEB35A310ad9802aa3d8aA70C1A5DAeF";

export const FTMBaseRegistrarAddress = "0xE8F09aF00435BC821f86A70098a9907240fb9978";

export const getContractHash = (connector) => {
  if (!connector) return null;
  const walletProvider = connector;
  let nftmarketContract = new ethers.Contract(
    AuctionRegistrarAddress,
    AuctionRegistrarAbi,
    walletProvider
  );
  return nftmarketContract;
};

export const getContractFTM = (connector) => {
  if (!connector) return null;
  const walletProvider = connector;
  let nftContract = new ethers.Contract(
    FTMBaseRegistrarAddress,
    FTMBaseRegistrarAbi,
    walletProvider
  );
  return nftContract;
};
