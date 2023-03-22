// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../../utils/EnsResolution';
import { useMintWithData } from '../../hooks/useMintWithData';
import { utils } from "ethers";

export const ManageButton = ({userAccess, manageState, manageStateCB}: any) => {

    if (!userAccess || userAccess === "false") {
        return (
            <div className="w-full h-fit flex flex-row items-center space-x-4 text-[14px]">
                <button 
                disabled={true}
                className="border-[1px] border-[#AEAEAE] text-[#AEAEAE] rounded-[30px] w-[100px] py-2 ">
                    manage           
                </button>
                <div className="border-[#AEAEAE] text-[#AEAEAE] flex flex-row">
                    ✱ you dont have access to this curation contract ✱
                </div>
            </div>
        )
    } else if (manageState === false) {
        return (
            <div className="w-full h-fit flex flex-row items-center space-x-4 text-[14px]">
                <button 
                disabled={false}
                onClick={()=>manageStateCB()}
                className="border-[1px] border-black text-black hover:bg-black hover:text-white rounded-[30px] w-[100px] py-2 ">
                    manage           
                </button>
            </div>            
        )
    } else {
        return (
            <div className="w-fit h-fit flex flex-row items-center space-x-4 text-[14px]">
                <button 
                onClick={()=>manageStateCB()}
                className="border-[1px] border-black text-white bg-black hover:bg-white hover:text-black rounded-[30px] w-[100px] py-2 ">
                    manage           
                </button>
            </div>            
        )        
    }

    // return (
    //     <>
    //     {!metadata || !collection ? (
    //         // TODO: maybe add a loading state instead here ?
    //         <div></div>            
    //     ) : (
    //         <div className="relative flex flex-row flex-wrap w-full  text-[14px]">
    //             <button
    //             className=""
    //             onClick={()=>write}
    //             >
    //                 Curate
    //             </button>                                                                                   
    //         </div>
    //     )}
    //     </>
    // )
}

export default ManageButton