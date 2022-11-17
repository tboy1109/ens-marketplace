import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { WalletModalProvider } from './context/WalletModalContext';
import { getLibrary } from './utils/connector'
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

let reclaimUri = "https://api.thegraph.com/subgraphs/name/victorious-king/fnsauction"
let ensUri = "https://api.thegraph.com/subgraphs/name/victorious-king/fnsdomain"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: reclaimUri
});

// const ensClient = new ApolloClient({ uri: ensUri });

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}> 
      <WalletModalProvider>
        <ApolloProvider client={client}>
          <App/>
        </ApolloProvider>
      </WalletModalProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
