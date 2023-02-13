import HomeCTA from "../elements/display/HomeCTA"
import Reader from "../elements/display/Reader"
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react"
import { useQuery } from 'urql';
import {createClient as urqlCreateClient} from 'urql';
// @ts-ignore

export default function Frame() {
    
    // test tab switcher
    const [siteStatus, setSiteStatus] = useState(0)
    const changeState = () => {
        if (siteStatus == 0) {
            setSiteStatus(1)
        } else {
            setSiteStatus(0)
        }
    }

    // state for determining what collection/tokenId to fetch
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
        // ipfs.nftstorage.link
        const fetchResult = await fetch(`https://${cid}.ipfs.nftstorage.link`)
        return fetchResult.text();
    }

    const fetcher = async (collection: string, tokenId: string) => {
        // 0xc1e87f349c0673de48f6292e594c62b35bc270a7 - 100 days of code
        // 0x9Ccb1eE41874b0346F9942cA7fa128Be12856BC2 - hyperstructures
        const aQuery = ` 
            query ListCollections {
                token(
                token: {address: "${collection}", tokenId: "${tokenId}"}
                network: {network: ETHEREUM, chain: GOERLI}
                ) {
                token {
                    metadata
                    owner
                }
            }
        }   
        `
        const {data} = await urqlClient.query(
            aQuery,
            {from: "100"}
        ).toPromise()
        console.log("what is data: ", data)
        // if query return is valid (metadata for collection address + tokenId exists)
        //      get the metadata + owner and setContent
        // if query return is invalid (null) setContent to blank
        if (!!data.token) {
            const {metadata, owner} = data.token.token
            setContent(await markdownConverter(metadata.animation_url.slice(7)))
        } else {
            setContent("")
        }
    }

    const pageStatusAndFetch = () => {
        fetcher(collection.collectionAddress, collection.tokenId)
        changeState();
    }    

    // useEffect(() => {
    //     if (!!collection.collectionAddress) {
    //         fetcher(collection.collectionAddress);
    //     }}, 
    //     []
    // )

    return (
        <section id="main-feed" className='text-[18px] grid grid-cols-1 h-screen w-full md:w-[75%] gap-4 justify-center'>
            {siteStatus == 0 ? (
                <div className=" flex flex-row items-center justify-center ">
                    <HomeCTA readCallback={pageStatusAndFetch} collectionOnChange={setCollection} collectionValue={collection.collectionAddress} collectionName={"collection"} tokenIdOnChange={setCollection} tokenIdName={"tokenId"} tokenIdValue={collection.tokenId} />
                </div>
            ) : (
                <div className=" flex flex-row items-center justify-center ">
                    <Reader contentInput={content} callback={changeState} />
                </div>
            )}
        </section>
    )
}