import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { ethers } from "ethers";
import Web3 from 'web3'
import { injected} from '../utils/connector';

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const handleError = (error) => {
  if (error instanceof NoEthereumProviderError) {
    toast.error(
      'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    );
  } else if (error instanceof UnsupportedChainIdError) {
    toast.error("You're connected to an unsupported network.");
  } else if (
    error instanceof UserRejectedRequestErrorInjected 
  ) {
    toast.error('Please authorize this website to access your Ethereum account.');
  } else if ((error).code === -32002) {
    toast.error('Already processing ethereum request Accounts. Please accept the request.');
  } else {
    console.error(error.toString());
    toast.error('An unknown error occurred. Check the console for more details.');
  }
};

export const useWallet = () => {
  const { activate, connector, ...props } = useWeb3React();
  useEffect(() => {
    const { ethereum } = window ;

    if (ethereum) {
      (async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const accounts = await provider.listAccounts()
          // const web3 = new Web3(ethereum.currentProvider || (window ).web3.currentProvider);
          // const accounts= await web3.eth.getAccounts();
          
          if (accounts.length > 0) {
            await activate(injected, (error) => handleError(error));
          }
        } catch (err) {
          console.log(err)
          // Handle Error
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const connect = async (type) => {
    try {
      if (type === 'injected') {
        const { ethereum } = window ;
        if (!ethereum) {
          return toast.error(
            'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
          );
        }
        return await activate(injected, (error) => handleError(error));
      }
    } catch (err) {
      console.log('Connect wallet err', err);
    }
  };

  return { ...props, connector, connect };
};
