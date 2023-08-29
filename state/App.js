import QrCode from "../components/qrcode";
import KeyInfo from "./keyInfo";
// import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Scanner } from "../components/scanner";
import "../styles.css";
import { initKeypom } from "@keypom/core";
import { Near } from "@near-js/wallet-account";
import { BrowserLocalStorageKeyStore } from "@near-js/keystores-browser";

const NETWORK_ID = "mainnet";
async function connectNear(privateKey, contractId){
  const myKeyStore = new BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: NETWORK_ID,
    keyStore: myKeyStore,
    nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
    walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${NETWORK_ID}.near.org`,
    explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
  };

  const nearConnection = new Near(connectionConfig);
  await initKeypom({
    near: nearConnection,
    network: NETWORK_ID,
    keypomContractId: contractId
  });
}


function App() {
  useEffect(() => {
    connectNear("v2.keypom.near")
  }, [])
  //state variables
  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Scanner/> } />
      </Routes>
    </div>
  );
}

export default App
// ReactDOM.render(<AppRouter />, document.getElementById("root"));
