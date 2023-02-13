// @ts-ignore

export default function HomeCTA({readCallback, collectionOnChange, collectionValue, collectionName, tokenIdName, tokenIdOnChange, tokenIdValue}) {


    return (
        <div
            className="grid grid-cols-1 grid-rows-auto md:grid-rows-auto text-[14px] w-[330px] md:w-[469px] h-fit"
        >
            <div className="text-left py-4  h-fit ">
                welcome to <i>reader</i> ! enter the contract address and the tokenid to render a markdown nft. note: if the nft is not a markdown file, reader will not render.
            </div>

            <div className="grid grid-cols-[1fr] grid-rows-auto md:grid-cols-[2fr_1fr] md:grid-rows-1 space-y-4 md:space-y-0 md:space-x-1 h-fit  w-full ">
                <div className=" cols-start-0 cols-end-1 row-start-0 row-end-1 flex flex-row flex-wrap h-fit gap-y-1 w-full">
                    <div className=" flex flex-row w-full h-full">
                        <div className=" h-fit flex flex-row items-center w-[65%] " >
                            contract address:
                        </div>
                        <input
                            type="text"
                            placeholder="0x86de...f2b2"
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
                            className=" placeholder:text-[#ACACAC] p-0 pl-1 border-[1px] border-black w-full flex flex-row items-center text-sm"
                        >
                        </input>
                    </div>                  
                    <div className=" flex flex-row w-full h-full">          
                        <div className="h-fit flex flex-row items-center w-[65%]" >
                            tokenid:
                        </div>
                        <input
                            type="text"
                            placeholder="1"
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
                            className="placeholder:text-[#ACACAC] p-0 pl-1 text-sm border-[1px] border-black w-full flex flex-row items-center"
                        >
                        </input>
                    </div>
                </div>
                <div className="md:cols-start-1 md:cols-end-2 md:row-start-0 md:row-end-1 flex flex-row justify-center pt-[7px] md:pt-0 md:flex-none w-full">
                    <button onClick={()=>readCallback()} className=" bg-black hover:bg-gray-900 text-white w-[145px] md:w-full h-[52px] md:h-full">
                        read
                    </button>
                </div>
            </div>
        </div>
    )
}