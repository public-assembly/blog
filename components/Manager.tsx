// @ts-nocheck
import { useMintWithData } from '../hooks/useMintWithData';
import { useManagerAccess } from '../hooks/useManagerAccess';
import { utils } from 'ethers';

export const Manager = ({userAddress, pressAddress}: any) => {

    const { userMintAccess } = useManagerAccess({
        userAddress,
        pressAddress,
        mintQuantity: 1
    })

    /*

    Figure out where to how to incorporate abi.encode for the curaiton listing stuf

    */

    // const {
    //     userMintAccess,
    //     config,
    //     error,
    //     write,
    //     data,
    //     isError,
    //     isLoading,
    //     isSuccess,
    //     status,
    //     mintWaitData,
    //     mintWaitLoading        
    // } = useMintWithData({
    //     userMintAccess,
    //     pressAddress,
    //     mintQuantity,
    //     mintData
    // })

    return (
        <>
            {userMintAccess === "false" ? (            
                <div>
                    NO MINT ACCESS
                </div>            
            ) : (
                <div>
                    <div>
                        YES MINT ACCESS
                    </div>
                    
                </div>  
            )}
        </>
    )
}