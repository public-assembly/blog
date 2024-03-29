// @ts-nocheck

import { useRouter } from "next/router";
import { useState, useEffect, useRef } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { NextPage } from 'next'
import { ListingCard } from "../components/ListingCard"
import { EnsResolution } from '../utils/EnsResolution';
import { useAuth } from "hooks/useAuth";
import { Manager2 } from "../components/Manager2"
import {ManageButton} from "../components/curationManager/ManageButton"
import { useManagerAccess } from '../hooks/useManagerAccess';

const CurationPage: NextPage = () => {

    const { address } = useAuth()
    
    const router = useRouter(); 
    const { id } = router.query;
    const contract: any = id ? id : "0x0000000000000000000000000000000000000000"

    const { userMintAccess } = useManagerAccess({
        userAddress: address,
        pressAddress: contract,
        mintQuantity: 1
    })    
    
    const [curationMetadata, setCurationMetadata] = useState();
    const [lastUpdated, setLastUpdated] = useState()
    const [parsedMetadata, setParsedMetadata] = useState();
    const [sidePanelOpen, setSidePanelOpen] = useState(false);

    console.log("curation metadata", curationMetadata)
    console.log("parsed metadata", parsedMetadata)

    const toggleSidePanel = () => {
        setSidePanelOpen(!sidePanelOpen);
    };    
    
    const convertDate = (date) => {
        const dateObj = new Date(date)
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options).toLowerCase();
        return formattedDate
    }    

    const uniqueCurators = (curators) => {
        const uniqueCurators = new Set(curators.map(curator => curator.curator))
        return uniqueCurators.size
    }

    const listed = curationMetadata ? curationMetadata.nfts : []
    const numCurators = curationMetadata ? uniqueCurators(listed) : 0
    const updated = lastUpdated ? convertDate(lastUpdated) : "mm/yy/dd/ss"
    const parsed = parsedMetadata ? parsedMetadata : []

    // Initializing Alchemy indexer configs
    const alchemy_setting_goerli = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI,
        network: Network.ETH_GOERLI,
    };
    const alchemy_settings_mainnet = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        network: Network.ETH_MAINNET, 
    };    

    // Initializing Alchemy indexer instances
    const alchemyGoerli = new Alchemy(alchemy_setting_goerli);
    const alchemyMainnet = new Alchemy(alchemy_settings_mainnet);

    const parseMetadata = async (metadata: any) => {
        let parsedNFTs = [];
        for (let i = 0; i < metadata.nfts.length; i++) {
            try {
                let nftData;
                if (metadata.nfts[i].rawMetadata.properties.curationTargetType == "1") {
                    // hardcode tokenId = 1 if the curation type is an nft contract
                    nftData = await alchemyMainnet.nft.getNftMetadata(
                        metadata.nfts[i].rawMetadata.properties.contract,
                        "1"
                    );
                } else if (metadata.nfts[i].rawMetadata.properties.curationTargetType == "4") {
                    // dynamically get tokenId from properties if the curation type is an nft item
                    nftData = await alchemyMainnet.nft.getNftMetadata(
                        metadata.nfts[i].rawMetadata.properties.contract,
                        metadata.nfts[i].rawMetadata.properties.selectedTokenId
                    );
                } else {
                    // If neither condition is met, push an empty object
                    nftData = [];
                }
                parsedNFTs.push(nftData);
            } catch (error) {
                console.error(`Error fetching NFT metadata for index ${i}:`, error);
                // Push an empty object or a custom error object to the parsedNFTs array
                parsedNFTs.push([]);
            }
        }
        setParsedMetadata(parsedNFTs);
    };
    

    const getMetadata = async () => {
        const curationInfo: any = await alchemyGoerli.nft.getNftsForContract(contract)
        setCurationMetadata(curationInfo);
        setLastUpdated(curationInfo?.nfts[curationInfo?.nfts.length-1]?.timeLastUpdated)        
        await parseMetadata(curationInfo) 
    }    

    useEffect(() => {
        if (!!contract && contract !== "0x0000000000000000000000000000000000000000") {
            getMetadata();
        }
    }, [contract, router.query]);    

    return (
        <div className="pt-[140px] pb-20 sm:pb-[0px] sm:pl-[30px] sm:pr-[59px] lg:pr-[193px] flex flex-col  flex-wrap min-h-screen h-full w-full ">
            {/* Side panel Stuff */}
            <div
                className={`fixed top-0 right-0 h-full w-[558px] bg-white shadow-2xl transform ${
                sidePanelOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-10`}
            >
                <div className="p-4 space-y-10">
                {/* Side panel title */}
                    <div className="flex justify-between items-center pl-2">
                        <h2 className="text-xl font-bold">Manager</h2>            
                        <button onClick={toggleSidePanel} className="focus:outline-none flex items-center justify-center h-fit w-fit hover:bg-[#ff89de] hover:bg-opacity-30 rounded-full transition-all duration-200">
                        <img src="/Union.svg" alt="Back arrow" />
                        </button>
                    </div>
                    {/* Dropdown sections */}
                    <Manager2 userAddress={address} pressAddress={contract} />            
                </div>
            </div>    
            <div className="h-fit flex flex-row flex-wrap justify-start w-full mb-[20px]">
                <div className="flex flex-row w-full items-end space-x-2">
                    <div className="text-[20px] font-bold flex flex-row p-0 m-0 justify-start h-fit " >
                        <a 
                        className="hover:underline hover:decoration-2"
                        href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.address}`}
                        >
                        {listed[0]?.contract?.name}
                        </a>
                    </div>
                    <div className="text-[20px] text-[#8FA8BE]">
                        {
                            listed.length <= 1 
                            ? "· " + (listed.length) + " item"
                            : "· " + (listed.length) + " items"
                        }
                    </div>
                </div>
                <div className="text-[16px] text-[#AAAAAA] flex flex-row flex-wrap justify-start w-full" >
                    <a 
                    className="hover:underline hover:decoration-2"
                    href={`https://goerli.etherscan.io/address/${listed[0]?.contract?.contractDeployer}`}
                    >
                        <EnsResolution address={listed[0]?.contract?.contractDeployer} />
                    </a>&nbsp;
                    {numCurators == 1 ? "" : `+ ${numCurators} others`}
                    
                </div>   
            </div>       
            <div className="flex flex-row justify-between items-end w-full pb-[12px]">
                <div className="flex flex-row text-[14px]">
                    <div>
                        last update
                    </div>
                    <div className="text-[#898989]">
                        &nbsp;{updated}
                    </div>
                </div>
                <ManageButton userAccess={userMintAccess} manageState={sidePanelOpen} manageStateCB={toggleSidePanel} />     
            </div>            
            <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">        
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