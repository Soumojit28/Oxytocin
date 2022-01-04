// import Artifact from "./abi.json";
import { ethers } from "ethers";
// const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider = new ethers.getDefaultProvider("wss://rinkeby.infura.io/ws/v3/fe8e5ac01a944ba2a9fd24160581045a")
const signer = provider.getSigner();

const contractAddress = "0xE5e766241dcB766AaeADD4D997F7f7F2b188109b";
const abi = [{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "presaleLive",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "saleLive",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function"
}
]
const contract = new ethers.Contract(contractAddress, abi, provider);

export const totalSupply = async () => {
  const n= await contract.totalSupply();
  return (n.toNumber())

};


export const presaleLive = async () => {
  const n= await contract.presaleLive();
  return (n)

};

export const saleLive = async () => {
  const n= await contract.saleLive();
  return (n)

};