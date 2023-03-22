// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../utils/EnsResolution';

export const ListingCard = ({index,  metadata, collection}: any) => {

    // console.log("index", index)
    // console.log("metadata", metadata)
    // console.log("collection", collection)

    return (
        <>
        {!metadata || !collection ? (
            // TODO: maybe add a loading state instead here ?
            <div></div>            
        ) : (
            <div className="relative flex flex-row flex-wrap w-full  text-[14px]">
                <div  className="overflow-hidden relative w-[340px] aspect-video mb-[12px]">
                    <Image
                        src={metadata?.media[0]?.thumbnail}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="font-bold flex flex-row flex-wrap w-full">
                    {metadata?.contract.name}
                </div>      
                <div className="flex flex-row flex-wrap w-full">
                    <EnsResolution address={metadata?.contract?.contractDeployer} />
                </div>                                                                                                                          
            </div>
        )}
        </>
    )
}