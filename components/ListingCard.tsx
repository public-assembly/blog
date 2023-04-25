// @ts-nocheck
import Image from "next/image";
import { EnsResolution } from '../utils/EnsResolution';

export const ListingCard = ({index,  metadata, collection}: any) => {

    return (
        <>
        {!metadata || !collection ? (
            // TODO: maybe add a loading state instead here ?
            <div></div>            
        ) : (
            <div className="relative flex flex-row items-start flex-wrap w-full max-w-full text-[14px] ">
                <div className="overflow-hidden relative w-full sm:w-[340px] sm:h-[191px] aspect-video mb-[5px]">
                    <Image
                        src={metadata?.media[0]?.thumbnail}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-[4px] w-full">
                    <div className="font-bold break-words">
                    {metadata?.contract.name}
                    </div>
                    <div className="break-words">
                    <EnsResolution address={metadata?.contract?.contractDeployer} />
                    </div>
                    <div className="h-[34px]">
                        <div className="text-[12px] leading-[16px] break-words overflow-hidden line-clamp-2 max-h-[2.8em]">
                        {metadata?.description}
                        </div>
                    </div>
                </div>                
            </div>
        )}
        </>
    )
}