// @ts-nocheck

import { erc721Press_abi } from "../abi/ERC721Press_abi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";

export function useMintwithData({userMintAccess, pressAddress, mintQuantity, mintData}: any) {

    const mintAccess = userMintAccess === "true" ? true : false
    const pressAddressInput = pressAddress ? pressAddress : ""
    const quantityInput = mintQuantity ? mintQuantity : ""
    const dataInput = mintData ? mintData : ""

    // mintWithData contract call flow

    const { config, error } = usePrepareContractWrite({
        address: pressAddressInput,
        abi: erc721Press_abi,
        functionName: "mintWithData",
        args: [
            quantityInput,
            dataInput
        ],
        enabled: mintAccess,
        overrides: {} // hardcoded as zero for no but should be dynamic based on prior read call
    })

    const { 
        write,
        data,
        isError,
        isLoading,
        isSuccess,
        status
    } = useContractWrite(config)      

    // Wait for data from bid call
    const { data: mintWaitData, isLoading: mintWaitLoading } = useWaitForTransaction({
        hash:  data?.hash,
        onSuccess(mintWaitData) {
            console.log("txn complete: ", mintWaitData)
            console.log("txn hash: ", mintWaitData.transactionHash)
        }
    })           

    return {
        config,
        error,
        write,
        data,
        isError,
        isLoading,
        isSuccess,
        status,
        mintWaitData,
        mintWaitLoading
    }
}