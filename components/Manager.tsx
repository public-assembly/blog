// @ts-nocheck
import { useManagerAccess } from '../hooks/useManagerAccess';
import { useState } from 'react'
import { utils } from "ethers";
import { CurateButton } from './curationManager/CurateButton';
import { ManageButton } from './curationManager/ManageButton';
import { CurationInput } from './curationManager/CurationInput';

export const Manager = ({userAddress, pressAddress}: any) => {

    const { userMintAccess, fetching } = useManagerAccess({
        userAddress,
        pressAddress,
        mintQuantity: 1
    })

    console.log("usermintAccess", userMintAccess)

    const [manageState, setManageState] = useState(false)
    // 0 = drop down not open
    // 1 = dropdown open

    const handleManageState = () => {
        setManageState(!manageState)
    }

    const curatorAddress = userAddress == undefined ? "0x0000000000000000000000000000000000000000" : userAddress

    const [inputData, setInputData] = useState({
        curatedAddress: "",
        selectedTokenId: "",
        // curator address not calculated in state
        curatorTargetType: 1, // (1 = nft contract, 3 = curation contract, 4 = nft item)
        sortOrder: 0,
        hasTokenId: false,
        chainId: 1
    })

    const curatedAddressington = utils.isAddress(inputData.curatedAddress) ? inputData.curatedAddress : "0x0000000000000000000000000000000000000000"
    const curatorAddressington = curatorAddress
    const tokenIdington = inputData.selectedTokenId ? inputData.selectedTokenId : "0"

    // currently only allows for minting one at a time

        const dataForMint: any = utils.defaultAbiCoder.encode(        
        ["(address, uint96, address, uint16, int32, bool, uint16)[]"],
        [
            // first brackets define that this is a tuple
            [
                // inner brackets necessary because param is an array of structs
                [
                    curatedAddressington,
                    tokenIdington,
                    curatorAddressington,
                    inputData.curatorTargetType,
                    inputData.sortOrder,
                    inputData.hasTokenId, 
                    inputData.chainId
                ]
            ]
        ]
    )

    if (manageState == 0) {
        return (
            <div className="flex flex-row  w-full"> 
                <ManageButton userAccess={userMintAccess} manageState={manageState} manageStateCB={handleManageState} />
            </div>                   
        )
    } else {
        return (
            <div className="flex flex-row items-center w-full space-x-8 "> 
                <ManageButton userAccess={userMintAccess} manageState={manageState} manageStateCB={handleManageState} />

                <CurationInput 
                    dataCallback={setInputData} 
                    curationAddress={inputData.curatedAddress} 
                    hasToken={inputData.hasTokenId}
                    id={inputData.selectedTokenId} 
                />
                <CurateButton mintAccess={userMintAccess} press={pressAddress} quantity={1} dataForMint={dataForMint}  />                
            </div>             
        )
    }

    // return (
        
    //     <>
    //         {fetching ? (
    //             <div className="w-[200px] h-[200px]"> 
    //                 Checking access . . .                    
    //             </div>   
    //         ): (
    //             <>
    //             {!userMintAccess || userMintAccess === "false" ? (            
    //                 <div className="flex flex-row border-2 w-full"> 
    //                     <ManageButton userAccess={userMintAccess} manageState={manageState} />
    //                 </div>            
    //             ) : (
    //                 <div className="">
    //                     <div>
    //                         <div>
    //                             YES MINT ACCESS
    //                         </div>
    //                         <CurationInput 
    //                             dataCallback={setInputData} 
    //                             curationAddress={inputData.curatedAddress} 
    //                             hasToken={inputData.hasTokenId}
    //                             id={inputData.selectedTokenId} 
    //                         />
    //                         <CurateButton mintAccess={userMintAccess} press={pressAddress} quantity={1} dataForMint={dataForMint}  />
    //                     </div>
                        
    //                 </div>  
    //             )}
    //             </>
    //         )}

    //     </>
    // )

}

export default Manager;