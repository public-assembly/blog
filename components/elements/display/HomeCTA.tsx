// @ts-ignore

export default function HomeCTA({readCallback, collectionOnChange, collectionValue, collectionName, tokenIdName, tokenIdOnChange, tokenIdValue}) {


    return (
        <div
            className="grid grid-cols-1 grid-rows-2 text-[14px] w-[469px] h-fit"
        >
            <div className="text-center py-4  h-fit ">
                welcome to <i>reader</i> ! enter the contract address and the tokenid to render a markdown nft. note: if the nft is not a markdown file, reader will not render.
            </div>

            <div className="grid grid-cols-[2fr_1fr] grid-rows-1 space-x-1 h-fit  w-full ">
                <div className="cols-start-0 cols-end-1 row-start-0 row-end-1 flex flex-row flex-wrap h-fit gap-y-1 w-full">
                    <div className=" flex flex-row w-full h-full">
                        <div className=" h-fit flex flex-row items-center w-[65%] " >
                            contract address:
                        </div>
                        <input
                            type="text"
                            name={collectionName}
                            value={collectionValue}
                            onChange={(e) => {
                                e.preventDefault();
                                collectionOnChange((current: object) => {
                                    return {
                                        ...current,
                                        collectionAddress: e.target.value                                             
                                    }
                                })
                            }}                
                            className=" p-0 pl-1 border-[1px] border-black w-full flex flex-row items-center text-sm"
                        >
                        </input>
                    </div>                  
                    <div className=" flex flex-row w-full h-full">          
                        <div className="h-fit flex flex-row items-center w-[65%]" >
                            tokenid:
                        </div>
                        <input
                            type="text"
                            name={tokenIdName}
                            value={tokenIdValue}
                            onChange={(e) => {
                                e.preventDefault();
                                tokenIdOnChange((current: object) => {
                                    return {
                                        ...current,
                                        tokenId: e.target.value                                             
                                    }
                                })
                            }}  
                            className="p-0 pl-1 text-sm border-[1px] border-black w-full flex flex-row items-center"
                        >
                        </input>
                    </div>
                </div>
                <div className="cols-start-1 cols-end-2 row-start-0 row-end-1 w-full">
                    <button onClick={()=>readCallback()} className="bg-black hover:bg-gray-900 text-white w-full h-full">
                        read
                    </button>
                </div>
            </div>
        </div>
    )
}