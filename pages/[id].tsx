// @ts-nocheck

import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { NextPage } from 'next'
import { ListingCard } from "../components/ListingCard.tsx"
import { EnsResolution } from '../utils/EnsResolution';

const CurationPage: NextPage = () => {

    const router = useRouter(); 
    const { id } = router.query;
    const contract: any = id ? id : ""
    
    const [curationMetadata, setCurationMetadata] = useState();
    const [parsedMetadata, setParsedMetadata] = useState();
    
    const listed = curationMetadata ? curationMetadata.nfts : []
    const parsed = parsedMetadata ? parsedMetadata : []

    // Initializing Alchemy indexer configs
    const alchemy_setting_goerli = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI,
        network: Network.ETH_GOERLI, // Replace with your network.
    };
    const alchemy_settings_mainnet = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        network: Network.ETH_MAINNET, 
    };    

    // Initializing Alchemy indexer instances
    const alchemyGoerli = new Alchemy(alchemy_setting_goerli);
    const alchemyMainnet = new Alchemy(alchemy_settings_mainnet);

    const parseMetadata = async (metadata: any) => {
        let parsedNFTs = []
        for (let i = 0; i < metadata.nfts.length; i++) {
            let nftData = await alchemyMainnet.nft.getNftMetadata(metadata.nfts[i].rawMetadata.properties.contract, "1")
            parsedNFTs.push(nftData)
        }
        setParsedMetadata(parsedNFTs)
    }

    const getMetadata = async () => {
        const curationInfo: any = await alchemyGoerli.nft.getNftsForContract(contract)
        setCurationMetadata(curationInfo);
        await parseMetadata(curationInfo) 
    }    

    useEffect(() => {
        if(!!contract) {
            getMetadata();
        }    
        },
        [router]
    )    

    return (
        <div className="pt-[40px] pl-[36px] flex flex-row flex-wrap h-screen w-full justify-center items-start ">
            <div className="pt-[120px] flex flex-row flex-wrap justify-start w-full">
                <div className="flex flex-row w-full  items-end space-x-2">
                    <div className="text-[32px] flex flex-row p-0 m-0 justify-start h-fit" >
                        <a 
                        className="hover:underline hover:decoration-2"
                        href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.address}`}
                        >
                        {listed[0]?.contract?.name}
                        </a>
                    </div>
                </div>

                <div className="text-[23px] text-gray-400 flex flex-row flex-wrap justify-start w-full" >
                    <a 
                    className="hover:underline hover:decoration-2"
                    href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.contractDeployer}`}
                    >
                        <EnsResolution address={listed[0]?.contract?.contractDeployer} />
                    </a>
                </div>                
            </div>
            <div className="grid grid-cols-4 space-x-[23px] w-full">
                {listed.map((collection: any, index) => (
                    <ListingCard
                        key={index}
                        index={index}
                        metadata={parsed[index]}
                        collection={collection}
                    />
                ))}
            </div>
        </div>
    )
}

export default CurationPage;