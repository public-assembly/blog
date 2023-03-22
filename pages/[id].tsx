// @ts-nocheck

import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { NextPage } from 'next'
import { ListingCard } from "../components/ListingCard.tsx"
import { Manager } from "../components/Manager.tsx"
import { EnsResolution } from '../utils/EnsResolution';
import { useAuth } from "hooks/useAuth";

const CurationPage: NextPage = () => {

    const { address } = useAuth()
    
    const router = useRouter(); 
    const { id } = router.query;
    const contract: any = id ? id : "0x0000000000000000000000000000000000000000"
    
    const [curationMetadata, setCurationMetadata] = useState();
    const [parsedMetadata, setParsedMetadata] = useState();
    const [fetching, setFetching] = useState(false)

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

    //  Return token 1 metadata from the contracts stored in listing receipts
    //      currently this works because we are only indexing zora erc721 editions
    //      tokenId will need to be dynamic and grabbed from the curation receipt as well AND
    //      we should be able to treat erc721s + erc1155s differently (erc721s will have hasTokenId = false)     
    const parseMetadata = async (metadata: any) => {
        let parsedNFTs = []
        for (let i = 0; i < metadata.nfts.length; i++) {
            let nftData = await alchemyMainnet.nft.getNftMetadata(metadata.nfts[i].rawMetadata.properties.contract, "1")
            parsedNFTs.push(nftData)
        }
        setParsedMetadata(parsedNFTs)
    }

    //  Get metadata fetches all of the curation receipt nfts for a given contract
    //      sets that to state, and then runs the parseMetadata function with the same return
    //      this is run on page load once the route changes post search query via useEffect
    const getMetadata = async () => {
        const curationInfo: any = await alchemyGoerli.nft.getNftsForContract(contract)
        setCurationMetadata(curationInfo);
        await parseMetadata(curationInfo) 
    }    

    // run if contract isnt null, if not dont do anythiing
    // trigger dependency == router to prevent this firing before contract value has arrived
    useEffect(() => {
        if(!!contract) {
            getMetadata();
        }    
        },
        [router]
    )    

    return (
        <div className="pt-[140px] pl-[36px] flex flex-col space-y-4 flex-wrap h-screen w-full ">
            <div className="h-fit flex flex-row flex-wrap justify-start  w-full mb-[20px]">
                <div className="flex flex-row w-full  items-end space-x-2">
                    <div className="text-[35px] flex flex-row p-0 m-0 justify-start h-fit " >
                        <a 
                        className="hover:underline hover:decoration-2"
                        href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.address}`}
                        >
                        {listed[0]?.contract?.name}
                        </a>
                    </div>
                </div>

                <div className="text-[18px] text-gray-400 flex flex-row flex-wrap justify-start w-full" >
                    <a 
                    className="hover:underline hover:decoration-2"
                    href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.contractDeployer}`}
                    >
                        <EnsResolution address={listed[0]?.contract?.contractDeployer} />
                    </a>
                </div>                        
            </div>            
            
            <Manager userAddress={address} pressAddress={contract}   />
            {/* <Container /> */}
            <div className="grid grid-cols-4  w-full ">
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