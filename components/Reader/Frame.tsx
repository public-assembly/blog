import HomeCTA from "../elements/display/HomeCTA"
import Reader from "../elements/display/Reader"
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react"
import { useQuery } from 'urql';
import {createClient as urqlCreateClient} from 'urql';
// @ts-ignore

export default function Frame() {
    
    // test tab switcher
    const [siteStatus, setSiteStatus] = useState(0)
    console.log("siteStatus: ", siteStatus)
    const changeState = () => {
        if (siteStatus == 0) {
            setSiteStatus(1)
        } else {
            setSiteStatus(0)
        }
    }

    const [collection, setCollection] = useState({
        collectionAddress: "", 
        tokenId: ""
    });

    // testing nft md fetching
    const [content, setContent] = useState("");

    const urqlClient = urqlCreateClient({
        url: "https://api.zora.co/graphql"
    })    

    const markdownConverter = async (cid: string) => {
        const fetchResult = await fetch(`https://ipfs.io/ipfs/${cid}`)
        return fetchResult.text();
    }

    const fetcher = async (collection: string) => {
        // 0xc1e87f349c0673de48f6292e594c62b35bc270a7
        const aQuery = ` 
            query ListCollections {
                tokens(
                    networks: {network: ETHEREUM, chain: GOERLI}
                    where: {collectionAddresses: "${collection}"}
                )   {
                        nodes {
                            token {
                            metadata
                            owner
                        }
                    }
                }
            }
        `
        const {data} = await urqlClient.query(
            aQuery,
            {from: "100"}
        ).toPromise()
        const {metadata, owner} = data.tokens.nodes[0].token
        setContent(await markdownConverter(metadata.animation_url.slice(7)))
    }

    useEffect(() => {
        if (!!collection.collectionAddress) {
            fetcher(collection.collectionAddress);
        }}, 
        [collection.collectionAddress]
    )

    console.log("content: ", content)

    console.log("what colletion", collection);

    return (
        <section id="main-feed" className='text-[18px] grid grid-cols-1 h-screen w-[75%]  gap-4 justify-center'>
            {siteStatus == 0 ? (
                <div className="flex flex-row items-center justify-center ">
                    <HomeCTA pageStatus={changeState} collectionCallback={setCollection} collectionState={collection} />
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center ">
                    <Reader contentInput={content} callback={changeState} />
                </div>
            )}
        </section>
    )
}