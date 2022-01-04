// import Artifact from "./abi.json";
import { ethers } from "ethers";
let contract;
export const providerHandler = async () => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new ethers.getDefaultProvider(
    "wss://rinkeby.infura.io/ws/v3/fe8e5ac01a944ba2a9fd24160581045a"
  );
  const signer = provider.getSigner();

  const contractAddress = "0xE5e766241dcB766AaeADD4D997F7f7F2b188109b";
  const abi = [
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleLive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "saleLive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tribepass_PRESALE_PRICE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tribepass_MAINSALE_PRICE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tribepass_MAX_COUNT",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  contract = new ethers.Contract(contractAddress, abi, provider);
};
export const totalSupply = async () => {
  const n = await contract.totalSupply();
  return n.toNumber();
};

export const presaleLive = async () => {
  const n = await contract.presaleLive();
  return n;
};

export const saleLive = async () => {
  const n = await contract.saleLive();
  return n;
};

export const presaleValue = async () => {
  const n = await contract.tribepass_PRESALE_PRICE();
  return n;
};

export const mainsaleValue = async () => {
  const n = await contract.tribepass_MAINSALE_PRICE();
  return n;
};

export const maxCount = async () => {
  const n = await contract.tribepass_MAX_COUNT();
  return n;
};
