// import Artifact from "./abi.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "axios";
let contract;
let address;
export const providerHandler = async () => {
  // const testprovider = new ethers.providers.Web3Provider(window.ethereum);
  // const accounts = await testprovider.listAccounts();
  // console.log(accounts[0]);
  // const balance = await testprovider.getBalance(accounts[0]);
  // console.log(balance);
  // const provider = new ethers.getDefaultProvider(
  //   "wss://rinkeby.infura.io/ws/v3/fe8e5ac01a944ba2a9fd24160581045a"
  // );

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const account = await provider.listAccounts();
  address = account[0];
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
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            { internalType: "bytes", name: "signature", type: "bytes" },
          ],
          internalType: "struct whitelistCheck.Whitelist",
          name: "whitelist",
          type: "tuple",
        },
        { internalType: "uint256", name: "tokenQuantity", type: "uint256" },
      ],
      name: "presaleBuy",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "tokenQuantity", type: "uint256" },
      ],
      name: "buy",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];
  contract = new ethers.Contract(contractAddress, abi, signer);
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
  return Number(ethers.utils.formatEther(n));
};

export const mainsaleValue = async () => {
  const n = await contract.tribepass_MAINSALE_PRICE();
  return Number(ethers.utils.formatEther(n));
};

export const maxCount = async () => {
  const n = await contract.tribepass_MAX_COUNT();
  return n;
};
export const presaleBuy = async (value, signature, quantity) => {
  console.log(value, signature, quantity);
  console.log(ethers.utils.parseEther(`${value * quantity}`).toString());
  const amount=Number(ethers.utils.parseEther(`${value * quantity}`).toString())
  console.log(amount);
  try {
    const n = await contract.presaleBuy([address, signature], quantity, {
      value: ethers.utils.parseEther(`${value * quantity}`).toString(),
    });
    console.log(n);
    toast(
      <div>
        <h4>Your Request is processing</h4>
        <h4>Your hash is :</h4>
        <h4>{n.hash}</h4>
      </div>,
      {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    const receipt = await n.wait();
    toast.success(`your transaction is completed.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(receipt);
  } catch (e) {
    toast.error("transaction failed " + e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("transaction failed " + e.message);
    return null;
  }
};

export const buy = async (value, quantity) => {
  try {
    const n = await contract.buy(quantity, {
      value: ethers.utils.parseEther(`${value * quantity}`).toString(),
    });
    console.log(n);
    const receipt = await n.wait();
    console.log(receipt);
  } catch (e) {
    console.log("transaction failed " + e.message);
    return null;
  }
};

export const whitelistCheck = async () => {
  try {
    const { data } = await axios.post("https://tribepass-back.herokuapp.com/whiteList", {
      wallet: address,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
