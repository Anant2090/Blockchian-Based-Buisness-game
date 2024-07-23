import React, { useEffect, useState } from "react";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import {
  TOKEN_CONTRACT_ADDRESS,
  WORKER_CONTRACT_ADDRESS,
} from "../constants/Contract";
import { getContract, readContract } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { prepareContractCall } from "thirdweb";
import Worker from "./Worker";

const Home = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [workerBal, setWorkerBal] = useState<string | null>(null);
  const acc = useActiveAccount();
  const addresss = acc?.address;
  const navigate = useNavigate();

  const contract = getContract({
    client,
    chain: sepolia,
    address: TOKEN_CONTRACT_ADDRESS,
  });

  const workerContract = getContract({
    client,
    chain: sepolia,
    address: WORKER_CONTRACT_ADDRESS,
  });

  const {
    mutate: sendTransaction,
    isPending,
    isError,
    isSuccess,
  } = useSendTransaction();

  async function getWorkerBal(add: string) {
    const data = await readContract({
      contract: workerContract,
      method: "function balanceOf(address owner) view returns (uint256)",
      params: [add],
    });
    setWorkerBal(data.toString());
    return data;
  }

  const getBal = async (contAdd: string) => {
    const data = await readContract({
      contract,
      method: "function balanceOf(address who) view returns (uint256)",
      params: [contAdd],
    });
    return data;
  };

  const amount = BigInt(1);

  const newuserClaimTokenandWorker = async (add: string, quantity: BigInt) => {
    try {
      const transaction = claimTo({
        contract: workerContract,
        to: add,
        quantity: amount,
      });
      sendTransaction(transaction);

      //  const transaction1 = prepareContractCall({
      //   contract,
      //   method: "function mintTo(address to, uint256 amount)",
      //   params: [add, amount]
      // });
      // sendTransaction(transaction1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addresss) {
      getBal(addresss).then((bal) => {
        setBalance(bal.toString());
      });
      getWorkerBal(addresss).then((bal) => {
        setWorkerBal(bal.toString());
        console.log("worker bal", bal.toString());
      });
    } else {
      navigate("/");
    }
  }, [addresss, navigate]);

  return (
    <>
      <div className={styles.navbarContainer} >
        <h1>Web3 Idle Game</h1>
        <div className={styles.navbarOptions}>
          {acc?.address && (
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
      <div>{workerBal?(<Worker/>):(<button onClick={() => {
        if(addresss)
        {
          newuserClaimTokenandWorker(addresss,amount)
        }
        else
        {
          navigate("/")
        }
      }}>
        Claim
      </button>)}
      {isPending && <p>Transaction is pending...</p>}
      {isError &&  <p>Error sending transaction.</p>}
      {isSuccess && <p>Transaction successful!</p>}
        
      </div>
    </>
  );
};

export default Home;
