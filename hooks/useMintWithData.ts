// @ts-nocheck

import { erc721Press_abi } from "../abi/erc721Press_abi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";

export function useMintWithData({userMintAccess, pressAddress, mintQuantity, mintData}: any) {

    console.log("what is the abi:", erc721Press_abi)

    console.log("usermintaccess at the top ", userMintAccess)

    const mintAccess = userMintAccess === "true" ? true : false
    const pressAddressInput = pressAddress ? pressAddress : ""
    const quantityInput = mintQuantity ? mintQuantity : ""
    const dataInput = mintData ? mintData : ""

    // mintWithData contract call flow

    console.log("prep mint access: ", mintAccess)

    const { config, error } = usePrepareContractWrite({
        address: pressAddressInput,
        abi: erc721Press_abi,
        functionName: "mintWithData",
        args: [
            quantityInput,
            dataInput
        ],
        enabled: mintAccess,
        // overrides: {} // hardcoded as zero for no but should be dynamic based on prior read call
    })

    console.log("prep config", config)
    console.log("prep config error", error)

    const { 
        write,
        data,
        isError,
        isLoading,
        isSuccess,
        status
    } = useContractWrite(config)      

    console.log("data: ", data)

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

export default useMintWithData