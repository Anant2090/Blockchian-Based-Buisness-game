import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useActiveAccount } from "thirdweb/react";
import { Link } from "react-router-dom";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { TOKEN_CONTRACT_ADDRESS } from "../constants/Contract";
import { getContract } from "thirdweb";
import { readContract } from "thirdweb";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BUSINESSES_CONTRACT_ADDRESS } from "../constants/Contract";
import { useReadContract } from "thirdweb/react";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { getNFTs } from "thirdweb/extensions/erc721";
import { getNFT } from "thirdweb/extensions/erc721";
import { uri } from "thirdweb/extensions/erc1155";
import { defineChain } from "thirdweb";

const Shop = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const addresss = account?.address;
  const [balance, setBalance] = useState<string | null>(null);

  const contract = getContract({
    client,
    chain: sepolia,
    address: TOKEN_CONTRACT_ADDRESS,
  });
  const getBal = async (contAdd: string) => {
    const data = await readContract({
      contract,
      method: "function balanceOf(address who) view returns (uint256)",
      params: [contAdd],
    });
    return data;
  };

  const Edition_contract =  getContract({

    // the client you have created via createThirdwebClient()
    
    client,
    
    // the chain the contract is deployed on
    
    chain: defineChain(11155111),
    
    // the contract's address
    
    address: "0x5B57986a8A6F875855d4B7B9c63176b01D3CBeCf",
    
    });
  console.log(Edition_contract);
  // const ac="0x53b45C1Dd01dC5cdB04CFd1b2c29688818A23FD6"
  const all_Nft = async () => {
    const nfts = await getNFTs({
      contract:Edition_contract,

      start: 0,

      count: 5,
    });
    console.log(nfts[0])
  };

  all_Nft();
  // useEffect(() => {
  //   if (addresss) {
  //     getBal(addresss).then((bal) => {
  //       setBalance(bal.toString());
  //     });

  //   } else {
  //     navigate("/");
  //   }
  // }, [addresss, navigate]);
  return (
    <>
      <div className={styles.navbarContainer}>
        <h1>Web3 Idle Game</h1>
        <div className={styles.navbarOptions}>
          {account?.address && (
            <>
              <Link to="/Home">Buisness</Link>
              <Link to="/Shop"> Shop</Link>
            </>
          )}
        </div>
        <div>
          <ConnectButton chain={sepolia} client={client} />
        </div>
        {balance && (
          <div>
            <p>Your Balance: {balance}</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-[38px]  text-center ">Buy Buisness</div>
        <div className="h-auto p-5 flex gap-5 flex-wrap pl-[130px] mt-5">
          <div className="h-[50vh] w-[25vw] flex flex-col gap-2 items-center rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-lemonade-stand-illustration-nature_23-2149452982.jpg?t=st=1721664588~exp=1721668188~hmac=2bfd95865f9341ff099906f9aa53b59292cea238d6dabfecf51910b9510d011b&w=740"
              className="h-[40vh] w-full object-cover rounded-lg		 bg-blue-300 "
            ></img>
            <button className="bg-blue-800 w-[380px] p-4 rounded-full">
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
