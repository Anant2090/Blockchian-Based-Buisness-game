import React from 'react';
import { useReadContract, useActiveAccount } from 'thirdweb/react';
import { WORKER_CONTRACT_ADDRESS } from '../constants/Contract';
import { sepolia } from 'thirdweb/chains';
import { client } from '../client';
import { getContract } from 'thirdweb';

// Helper function to convert IPFS URL to a public gateway URL
const getIpfsUrl = (ipfsUrl:string) => {
  if (ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return ipfsUrl;
};

const Worker = () => {
  const account = useActiveAccount();

  const contract = getContract({
    client,
    chain: sepolia,
    address: WORKER_CONTRACT_ADDRESS
  });

  const { data, isLoading, error } = useReadContract({ 
    contract, 
    method: "function sharedMetadata() view returns (string name, string description, string imageURI, string animationURI)", 
    params: [] 
  });

  const image = data ? getIpfsUrl(data[2]) : null;
  const address = account?.address;

  if (error) {
    console.error("Failed to read contract:", error);
  }

  return (
    <div className='flex gap-2'>
    <div className='h-[86.3vh] rounded-md bg-[#2a2929] w-[30vw] flex items-center justify-center'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='h-[70%] w-[80%] bg-violet-300 flex items-center justify-center'>
            {image && <img src={image} className='rounded-md' alt="Metadata Image" />}
        </div>
      )}
    </div>
    <div className='h-[86.3vh] w-[70vw] bg-[#2a2929] rounded-md  flex items-center justify-center'>

    </div>
    </div>
  );
};

export default Worker;