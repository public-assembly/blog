export default function Search({routeChange, collectionOnChange, collectionValue, collectionName}: any) {

    return (
        <div
            className="grid grid-cols-1 grid-rows-auto md:grid-rows-auto text-[14px] justify-center  w-fit h-fit"
        >
            <div className=" flex flex-row justify-center space-y-4 md:space-y-0 h-full ">
                <div className=" flex flex-row  h-full w-[539px] ">
                    <input
                        type="text"
                        placeholder="contract address"
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
                        className="rounded-l-[30px] placeholder:text-[#9A9A9A] p-t-3 pl-3 border-[1px] border-black w-full flex flex-row items-center text-[16px]"
                    >
                    </input>
                </div>
                <div className="flex flex-row  h-full w-[64px] ">
                    <button onClick={()=>routeChange()} className=" rounded-r-[30px] border-t-[1px] border-r-[1px] border-b-[1px] border-black hover:bg-gray-100 text-white w-[50px]  h-[52px] md:h-full">
                        🔍
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-center text-left py-4  h-fit ">
                welcome to&nbsp;<i>index</i> ! enter the curation contract you want to look up
            </div>    
            <div className="flex flex-row justify-center text-left  h-fit text-[12px]">
                <i>for testing purposes →&nbsp;
                    <a className="hover:underline" href="https://goerli.etherscan.io/address/0xe945f1a1671d6819bedbb9178aed41b11e8b83a8">
                        0xe945f1a1671d6819bedbb9178aed41b11e8b83a8
                    </a>
                </i>        
            </div>                          
        </div>
    )
}