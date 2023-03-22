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

    // state for loading txns
    const svgLoader = () => {
        return (
            <div className="flex flex-row justify-center items-center w-full ">
                <img
                width="20px"
                src="/SVG-Loaders-master/svg-loaders/tail-spin.svg"
                />
            </div>
        )
    }

    const curateSpinner = isLoading || mintWaitLoading
        ? svgLoader()
        : "curate"     

        // const curateSpinner = svgLoader()


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
            <div className="w-fit h-fit flex flex-row items-center  text-[14px]">
                <button
                    className="border-[1px] border-black text-white bg-black disabled:bg-black hover:bg-white hover:text-black rounded-[30px] w-[100px] py-2 "
                    onClick={()=>write()}
                    disabled={isLoading || mintWaitLoading ? true : false}
                >
                    {curateSpinner}
                </button>                                                                                   
            </div>
        )}
        </>
    )
}

export default CurateButton