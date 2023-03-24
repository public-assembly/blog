// @ts-nocheck
import { useManagerAccess } from '../hooks/useManagerAccess';
import { useState } from 'react'
import { utils } from "ethers";
import { CurateButton } from './curationManager/CurateButton';
import { ManageButton } from './curationManager/ManageButton';
import { CurationInput2 } from './curationManager/CurationInput2';

export const Manager2 = ({userAddress, pressAddress}: any) => {

    // new
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [removeFormOpen, setRemoveFormOpen] = useState(false);
    const [sortFormOpen, setSortFormOpen] = useState(false);
    // new    

    const { userMintAccess, fetching } = useManagerAccess({
        userAddress,
        pressAddress,
        mintQuantity: 1
    })

    console.log("usermintAccess", userMintAccess)

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

    return (
        <div className="flex flex-row flex-wrap items-center w-full  "> 
            <>
                <div className="relative  w-full flex flex-row flex-wrap space-y-2">
                    <button onClick={() => setAddFormOpen(!addFormOpen)} className="text-[18px] hover:bg-opacity-5 hover:bg-black py-2 border-b-[1px] border-black flex flex-row w-full items-center pl-2">
                    <img className="pr-5" src="upsideDownChevron.svg" />&nbsp;Add
                    </button>    
                    {addFormOpen && (
                    <div className="w-full flex flex-row flex-wrap space-y-2">

                    <CurationInput2 
                    dataCallback={setInputData} 
                    curationAddress={inputData.curatedAddress} 
                    hasToken={inputData.hasTokenId}
                    id={inputData.selectedTokenId} 
                    />
                    <CurateButton mintAccess={userMintAccess} press={pressAddress} quantity={1} dataForMint={dataForMint}  />
                    </div>
                    )}
                </div>
            </>        
            <>
                <div className="relative  w-full flex flex-row flex-wrap space-y-2">
                    <button onClick={() => setRemoveFormOpen(!removeFormOpen)} className="text-[18px] hover:bg-opacity-5 hover:bg-black py-2 border-b-[1px] border-black flex flex-row w-full items-center pl-2">
                    <img className="pr-5" src="upsideDownChevron.svg" />&nbsp;Remove
                    </button>    
                    {removeFormOpen && (
                    <div className="w-full flex flex-row flex-wrap space-y-2">

                    <CurationInput2 
                    dataCallback={setInputData} 
                    curationAddress={inputData.curatedAddress} 
                    hasToken={inputData.hasTokenId}
                    id={inputData.selectedTokenId} 
                    />
                    <CurateButton mintAccess={userMintAccess} press={pressAddress} quantity={1} dataForMint={dataForMint}  />
                    </div>
                    )}
                </div>
            </>      
            <>
                <div className="relative  w-full flex flex-row flex-wrap space-y-2">
                    <button onClick={() => setSortFormOpen(!sortFormOpen)} className="text-[18px] hover:bg-opacity-5 hover:bg-black py-2 border-b-[1px] border-black flex flex-row w-full items-center pl-2">
                    <img className="pr-5" src="upsideDownChevron.svg" />&nbsp;Sort 
                    </button>    
                    {sortFormOpen && (
                    <div className="w-full flex flex-row flex-wrap space-y-2">

                    <CurationInput2 
                    dataCallback={setInputData} 
                    curationAddress={inputData.curatedAddress} 
                    hasToken={inputData.hasTokenId}
                    id={inputData.selectedTokenId} 
                    />
                    <CurateButton mintAccess={userMintAccess} press={pressAddress} quantity={1} dataForMint={dataForMint}  />
                    </div>
                    )}
                </div>
            </>                                              
        </div>             
    )
}

export default Manager2;