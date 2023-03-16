import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { NextPage } from 'next'

const CurationPage: NextPage = () => {
    const router = useRouter(); 
    console.log("router:", router.query)    
    const { id } = router.query;
    console.log("id:", id)    

    console.log("what is curaitn contracT: ", id)

    const contract: any = id ? id : "hehe"
    
    const [curationMetadata, setCurationMetadata] = useState();
    
    const listed = curationMetadata ? curationMetadata.nfts : []

    console.log("curaitonMetadata: ", listed)


    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
        apiKey: '1kuwrlN630lT2G_BsfpYMW0AcrNOCTMg', // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    const cleanMetadata = (metadata: any) => {
        for (let i = 0; i < metadata.length; i++) {
            
        }
    }

    const getMetadata = async () => {
        console.log("contract.id:", contract)
        const ok: any = await alchemy.nft.getNftsForContract(contract)
        console.log("ok: ", ok)
        setCurationMetadata(ok);
        // const curationFetch: any = alchemy.nft.getNftsForContract(contract)
        //     .then(console.log)
        //     .then((data) => setCurationMetadata(data))    
    }    

    useEffect(() => {
            if(!!contract) {
                getMetadata();
            }    
        
        },
        [router]
    )    

  // Access the Alchemy NFT API
  // alchemy.nft.getNftsForOwner('0x806164c929Ad3A6f4bd70c2370b3Ef36c64dEaa8').then(console.log);
//   const getMetadata = () => {

//     const metadata: any = alchemy.nft.getNftMetadataBatch(
//       [
//         {
//           contractAddress: "0xBE9D377CA770F8350E531Fa8633E9E880b94BD6C",
//           tokenId: "1"
//         }
//       ]
//     ).then(console.log);

//   "getMetadata was run"

// getMetadata();    

    return (
        <div className="flex flex-row flex-wrap  h-screen w-full md:w-[90%] border-2 gap-4 justify-center items-center ">
            {/* <div>
                {"curation contract name: " + listed[0].contract.name}
            </div> */}
            {listed.map((collection: any) => (
                <div className="flex flex-row flex-wrap w-full">
                    <div className="font-bold flex flex-row flex-wrap w-full">
                        {"Curation Receipt # " + collection.tokenId}
                    </div>                    
                    <div className="flex flex-row flex-wrap w-full">
                        {"Curation Target Type: " + collection.rawMetadata.properties.curationTargetType}
                    </div>                                        
                    <div className="flex flex-row flex-wrap w-full">
                        {"Curator: " + collection.rawMetadata.properties.curator}
                    </div>                                        
                    <div className="flex flex-row flex-wrap w-full">
                        {"Chain Id " + collection.rawMetadata.properties.chainId}
                    </div>                                        
                    <div className="flex flex-row flex-wrap w-full">
                        {"Curated Address: " + collection.rawMetadata.properties.contract}
                    </div>                                        
                    <div className="flex flex-row flex-wrap w-full">
                        {"Sort Order: " + collection.rawMetadata.properties.sortOrder}
                    </div>          
                    <div className="flex flex-row flex-wrap w-full">
                        {"Has token Id: " + collection.rawMetadata.hasTokenId}
                    </div>    
                    <div className="flex flex-row flex-wrap w-full">
                        {"type: " + collection.rawMetadata.properties.type}
                    </div>    
                    <div className="flex flex-row flex-wrap w-full">
                        {"selected tokenId: " + collection.rawMetadata.properties.selectedTokenId}
                    </div>                                                                                                                                                               

                </div>
            ))}
        </div>
    )
}

export default CurationPage;