// @ts-nocheck
import { useState, useEffect } from "react";

export function useManagerAccess({userAddress, pressAddress, mintQuantity}: any) {

    const [userMintAccess, setUserMintAccess] = useState(false)
    const [fetching, setFetching] = useState(false)

    const userAddressInput = userAddress ? userAddress : ""
    const pressAddressInput = pressAddress ? pressAddress : null
    const quantityInput = mintQuantity ? mintQuantity : ""

    const zeroAddress: string = "0x0000000000000000000000000000000000000000"

    const getAccess = () => {
        if (!userAddress || pressAddress === zeroAddress) {
            setUserMintAccess(false)
            return
        }                
        fetch(`https://goerli.ether.actor/${pressAddressInput}/getLogic`)   
            .then(response => response.text())
            .then((data) => {
                console.log("logic contract ", data) 
                return fetch(`https://goerli.ether.actor/${data}/canMint/${pressAddressInput}/${quantityInput}/${userAddressInput}`) 
            })
            .then(response => response.text())   
            .then((data) => {
                console.log("user mint access", data);
                setUserMintAccess(data) 
            })
            .finally(setFetching(false))            
    }

    // run getAccess fetch on any change to pressAddressInput or userAddressInput
    useEffect(() => {
        getAccess()        
    },
    [pressAddressInput, userAddressInput]
    )   

    return { fetching, userMintAccess }
}