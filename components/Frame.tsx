// @ts-nocheck

import Search from "./Search"
import { useState } from "react"
import { useRouter } from "next/router";

export default function Frame() {
    const router = useRouter(); 

    // state for determining what collection to search
    const [collection, setCollection] = useState({
        collectionAddress: router?.query?.id, 
    });

    // change route function, passed in as callback to the search component
    const routeChange = () => {
        router.push({
            pathname: collection.collectionAddress
        })
    }

    return (
        <section id="main-feed" className=' mb-[50px] flex flex-row w-full  items-start justify-center'>
            <div className=" flex flex-row flex-wrap items-center justify-center">
                <div className="flex flex-row w-full justify-center text-[40px] pb-[20px] font-normal" >
                index
                </div>
                <Search routeChange={routeChange} collectionOnChange={setCollection} collectionValue={collection.collectionAddress} collectionName={"collection"} />
            </div>
        </section>
    )
}