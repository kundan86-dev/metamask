import React, { useState, useEffect } from "react";
import Web3 from "web3";
import './App.css';

const provider = new Web3(window.ethereum);
let accounts;

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState();

  const connectMetamask = async (e) => {
    try {
      e.preventDefault();

      if (window.ethereum) {
        accounts = await provider.eth.requestAccounts();

        if (accounts.length > 0) {
          setAccount(`Connected Account: ${accounts[0]}`);
          // await getWalletBalance(accounts[0]);
        } else {
          console.error("No Ethereum accounts available.");
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWalletBalance = async () => {
    try {
      const weiBalance = await provider.eth.getBalance(accounts[0]);
      const etherBalance = provider.utils.fromWei(weiBalance, "ether");
      setBalance(`Wallet Balance: ${parseFloat(etherBalance)} ETH`);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  // useEffect(() => {
  //   // Check if MetaMask is installed and get the initial account and balance
  //   if (window.ethereum) {
  //     connectMetamask();
  //   } else {
  //     console.error("MetaMask is not installed.");
  //   }
  // }, []);

  return (
    <div className="App">
    <div className="font">
    <button onClick={connectMetamask} className="btn">CONNECT TO METAMASK</button>
      <p>{account}</p>
      <button onClick={getWalletBalance} className="btn">Get Balance</button>
      <p>{balance}</p>
    </div>
    </div>
  );
}

export default App;
