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
        <section id="main-feed" className='grid grid-cols-1 h-screen w-full  gap-4 justify-center'>
            <div className=" flex flex-row items-center justify-center ">
                <Search routeChange={routeChange} collectionOnChange={setCollection} collectionValue={collection.collectionAddress} collectionName={"collection"} />
            </div>
        </section>
    )
}