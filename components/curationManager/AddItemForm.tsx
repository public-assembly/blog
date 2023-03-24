// @ts-nocheck

import React, { useState } from 'react';
import { CurationInput2 } from "./CurationInput2"

const AddItemForm = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenIdType, setTokenIdType] = useState(true);
  const [chainId, setChainId] = useState('');
  const [curationType, setCurationType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contractAddress">Contract Address:</label>
        <input
          type="text"
          id="contractAddress"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tokenId">Token ID:</label>
        <input
          type="text"
          id="tokenId"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tokenIdType">Token ID Type:</label>
        <label>
          <input
            type="radio"
            name="tokenIdType"
            value="true"
            checked={tokenIdType === true}
            onChange={() => setTokenIdType(true)}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="tokenIdType"
            value="false"
            checked={tokenIdType === false}
            onChange={() => setTokenIdType(false)}
          />
          False
        </label>
      </div>
      <div>
        <label htmlFor="chainId">Chain ID:</label>
        <input
          type="text"
          id="chainId"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="curationType">Curation Type:</label>
        <input
          type="text"
          id="curationType"
          value={curationType}
          onChange={(e) => setCurationType(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddItemForm;
