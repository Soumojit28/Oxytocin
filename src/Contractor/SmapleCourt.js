import Artifact from "./api.json";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contractAddress = "0xE5e766241dcB766AaeADD4D997F7f7F2b188109b";

const contract = new ethers.Contract(contractAddress, Artifact, signer);

export const totalSupply = async () => {
  return await contract.totalSupply();
};
