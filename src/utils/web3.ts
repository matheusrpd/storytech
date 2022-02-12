declare let window: any;

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import ABI from '../abi.json';

let web3;
let contractStoryTech;

if (typeof window !== 'undefined') {
  const { ethereum } = window;

  if (!ethereum) {
    alert('Instale a MetaMask.');
  }

  web3 = new Web3(window.ethereum);

  contractStoryTech = new web3.eth.Contract(
    ABI as AbiItem[],
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
}

export {
  web3,
  contractStoryTech
};