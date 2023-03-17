// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../utils/EnsResolution';

export const ListingCard = ({index,  metadata, collection}: any) => {

    console.log("index", index)
    console.log("metadata", metadata)
    console.log("collection", collection)

    return (
        <>
        {!metadata || !collection ? (
            <div></div>            
            // <div className="flex flex-row border-2 relative w-[300px] h-[300px] justify-center items-center">
            //     nothing
            // </div>
        ) : (
            <div className="relative flex flex-row flex-wrap w-full  text-[14px]">
                <div  className="overflow-hidden relative w-[300px]  aspect-video mb-[14px]">
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
                    by&nbsp;<EnsResolution address={metadata?.contract?.contractDeployer} />
                </div>                                     
                <div className="flex flex-row flex-wrap w-full">
                    curator&nbsp;<EnsResolution address={collection.rawMetadata.properties.curator}/>
                </div>                                     
                {/* <div className="flex flex-row flex-wrap w-full">
                    {metadata?.description}
                </div>           */}                                                         
            </div>
        )}
        </>
    )
}