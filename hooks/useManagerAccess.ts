// @ts-nocheck
import { useState, useEffect } from "react";

export function useManagerAccess({userAddress, pressAddress, mintQuantity}: any) {

    const [userMintAccess, setUserMintAccess] = useState(false)

    const userAddressInput = userAddress ? userAddress : ""
    const pressAddressInput = pressAddress ? pressAddress : null
    const quantityInput = mintQuantity ? mintQuantity : ""

    const getAccess = () => {
        const url: string = `https://goerli.ether.actor/${pressAddressInput}/getLogic`
        fetch(url)   
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
    }

    // run if pressAddress isnt null, if not dont do anythiing
    // trigger dependency == userAddress to prevent this firing before contract value has arrived
    useEffect(() => {
        if(!!pressAddressInput) {
            getAccess()
        }},
        [pressAddressInput, userAddressInput]
    )        

    return { userMintAccess }
}