// @ts-nocheck

import { useState } from "react";

export const CurationInput2 = ({ dataCallback, curationAddress, hasToken, id }) => {

    
    const checkedValue = !hasToken ? false : hasToken === "true" ? true : false;

  return (
    <div className="relative  w-full flex flex-row flex-wrap space-y-2">
    <div className="flex flex-col space-y-2  text-[14px] pl-2 w-full">
      <div className="flex flex-row items-center h-fit w-fit space-x-2">
        <label htmlFor="contractAddress">Contract Address:</label>
        <input
          type="text"
          id="contractAddress"
          placeholder="0xA7be . . ."
          value={curationAddress}
          onChange={(e) => {
            e.preventDefault();
            dataCallback((current) => {
              return {
                ...current,
                curatedAddress: e.target.value,
              };
            });
          }}
          className="placeholder:text-[#9A9A9A] h-6 border-[1px] border-black w-f flex flex-row  text-[14px]"
        ></input>
      </div>
      <div className="flex flex-row items-center h-fit w-fit space-x-2">
        <label htmlFor="tokenId">Token ID:</label>
        <label htmlFor="tokenIdTrue">True</label>
        <input
            type="radio"
            id="tokenIdTrue"
            name="tokenIdType"
            value="true"
            checked={checkedValue}
            onChange={(e) => {
            dataCallback((current) => {
                return {
                ...current,
                hasTokenId: e.target.value,
                };
            });
            }}
        ></input>
        <label htmlFor="tokenIdFalse">False</label>
        <input
            type="radio"
            id="tokenIdFalse"
            name="tokenIdType"
            value="false"
            checked={!checkedValue}
            onChange={(e) => {
            dataCallback((current) => {
                return {
                ...current,
                hasTokenId: e.target.value,
                };
            });
            }}
        ></input>
        <input
            type="text"
            id="tokenIdValue"
            placeholder="0"
            value={id}
            disabled={!checkedValue}
            onChange={(e) => {
            dataCallback((current) => {
                return {
                ...current,
                selectedTokenId: e.target.value,
                };
            });
            }}
            className="placeholder:text-[#9A9A9A] pl-3 border-[1px] border-black w-[72px] flex flex-row items-center text-[16px] h-6"
        ></input>
        </div>
      {/* Add fields for Chain ID and Curation Type here */}
      <div className="flex flex-row items-center h-fit w-fit space-x-2">
        <label htmlFor="chainId">Chain ID:</label>
        <input
          type="text"
          id="chainId"
          placeholder="Chain ID"
          onChange={(e) => {
            e.preventDefault();
            dataCallback((current) => {
              return {
                ...current,
                chainId: e.target.value,
              };
            });
          }}
          className="placeholder:text-[#9A9A9A] h-6 border-[1px] border-black w-[200px] flex flex-row  text-[14px]"
        ></input>
      </div>
      <div className="flex flex-row items-center h-fit w-fit space-x-2">
      <label htmlFor="curationType">Curation Type:</label>
        <select
          id="curationType"
          onChange={(e) => {
            e.preventDefault();
            dataCallback((current) => {
              return {
                ...current,
                curationType: e.target.value,
              };
            });
          }}
          className="placeholder:text-[#9A9A9A] h-6 border-[1px] border-black w-[200px] flex flex-row  text-[14px]"
        >
          <option value="">Select Curation Type</option>
          <option value="Token">Token</option>
          <option value="Collection">Collection</option>
          <option value="Curation Contract">Curation Contract</option>
        </select>
      </div>
    </div>
    </div>
  );
};

export default CurationInput2;

