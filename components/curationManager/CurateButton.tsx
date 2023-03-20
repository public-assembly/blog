// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../../utils/EnsResolution';
import { useMintWithData } from '../../hooks/useMintWithData';
import { utils } from "ethers";

export const CurateButton = ({mintAccess, press, quantity, dataForMint}: any) => {

    console.log("curatebutton mint acces: ", mintAccess)

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
    } = useMintWithData({
        userMintAccess: mintAccess,
        pressAddress: press,
        mintQuantity: quantity,
        mintData: dataForMint
    })

    console.log("checking config in here too", config)

    return (
        <>
        {!mintAccess ? (
            // TODO: maybe add a loading state instead here ?
            <div>
                <button
                    className="border-black border-[1px] bg-white text-black"
                    disabled={true}
                >
                    Nah
                </button>
            </div>            
        ) : (
            <div className="relative flex flex-row flex-wrap w-full  text-[14px]">
                <button
                    className="border-black border-[1px] bg-black text-white"
                    onClick={()=>write()}
                >
                    Curate
                </button>                                                                                   
            </div>
        )}
        </>
    )
}

export default CurateButton