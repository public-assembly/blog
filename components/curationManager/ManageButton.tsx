// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../../utils/EnsResolution';
import { useMintWithData } from '../../hooks/useMintWithData';
import { utils } from "ethers";

export const ManageButton = ({curatedAddress, curatedId, hasId, curatedType, sender, mintAccess, press, quantity}: any) => {

    // currently only allows for minting one at a time
    const dataForMint: any = utils.defaultAbiCoder.encode(
        [
            "address", // curatedAddress
            "uint96", // selectedTokenId
            "address", // curator
            "uint16", // curatorTargetType (1 = nft contract, 3 = curation contract, 4 = nft item)
            "int32", // sortOrder
            "bool", // hasTokenId
            "uint16" // chainId
        ],
        [
            curatedAddress,
            curatedId,
            sender,
            curatedType,
            sender,
            0, // sortOrder hardcoded
            hasId,
            1 // chainId hardcoded
        ]
    )

    const {
        userMintAccess,
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
    } = useMintWithData(
        mintAccess,
        press,
        quantity,
        dataForMint
    )
    return (
        <>
        {!metadata || !collection ? (
            // TODO: maybe add a loading state instead here ?
            <div></div>            
        ) : (
            <div className="relative flex flex-row flex-wrap w-full  text-[14px]">
                <button
                className=""
                onClick={()=>write}
                >
                    Curate
                </button>                                                                                   
            </div>
        )}
        </>
    )
}

export default ManageButton