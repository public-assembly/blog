import { useState } from "react";

// export default function CurationInput({routeChange, collectionOnChange, collectionValue, collectionName}: any) {

export const CurationInput = ({dataCallback, curationAddress, hasToken, id}: any ) => {

    const checkedValue = !hasToken ? false : hasToken == "true" ? true : false

    console.log("whecked value: ", checkedValue)

    console.log("has token Id: ", hasToken)

    console.log("does has token equal true ?", hasToken == "true" ? "yes" : "no")

    return (
        <div
            className="grid grid-cols-2 grid-rows-1 text-[14px] w-full h-fit"
        >
            <div className=" flex flex-row justify-center items-center h-full ">
                <div className=" flex flex-row  h-full w-full ">
                    <div className=" h-fit flex flex-row items-center w-[65%] " >
                        contract address:
                    </div>
                    <input
                        type="text"
                        placeholder="contract address"
                        name={"contract address"}
                        value={curationAddress}
                        onChange={(e) => {
                            e.preventDefault();
                            dataCallback((current: object) => {
                                return {
                                    ...current,
                                    curatedAddress: e.target.value                                             
                                }
                            })
                        }}                
                        className=" placeholder:text-[#9A9A9A] p-t-3 pl-3 border-[1px] border-black w-[200px] flex flex-row items-center text-[16px]"
                    >
                    </input>
                </div>
                <div className=" flex flex-row  items-center h-full w-full border-2 ">
                    <div className=" h-fit flex flex-row  w-[65%] " >
                        tokenId:
                    </div>
                    <label> True</label>                                     
                    <input 
                        type="checkbox" 
                        id="vehicle1" 
                        name="True" 
                        value={hasToken}
                        checked={checkedValue}
                        // disabled={checkedValue}
                        disabled={true}
                        onChange={(e) => {
                            e.preventDefault();
                            dataCallback((current: object) => {
                                return {
                                    ...current,
                                    hasTokenId: "true"                                            
                                }
                            })
                        }}                             
                        // onChange={handleHasTokenId}                      
                    >
                    </input>
                    <label> False</label>   
                    <input 
                        type="checkbox" 
                        id="vehicle2" 
                        name="False" 
                        // value="false"
                        value={hasToken}
                        checked={!checkedValue}
                        // disabled={!checkedValue}
                        disabled={true}
                        onChange={(e) => {
                            e.preventDefault();
                            dataCallback((current: object) => {
                                return {
                                    ...current,
                                    hasTokenId: "false"                                          
                                }
                            })
                        }}                            
                        // onChange={handleHasTokenId}                      
                    >
                    </input>                    
                </div>  
                <div className=" flex flex-row  h-full w-full ">
                    <input
                        type="text"
                        placeholder="0"
                        name={"tokenington"}
                        value={id}
                        disabled={true}
                        onChange={(e) => {
                            e.preventDefault();
                            dataCallback((current: object) => {
                                return {
                                    ...current,
                                    selectedTokenId: e.target.value                                             
                                }
                            })
                        }}                
                        className=" placeholder:text-[#9A9A9A] p-t-3 pl-3 border-[1px] border-black w-[200px] flex flex-row items-center text-[16px]"
                    >
                    </input>
                </div>                              
                {/* <div className="flex flex-row  h-full w-[64px] ">
                    <button onClick={()=>routeChange()} className=" rounded-r-[30px] border-t-[1px] border-r-[1px] border-b-[1px] border-black hover:bg-gray-100 text-white w-[50px]  h-[52px] md:h-full">
                        🔍
                    </button>
                </div> */}
            </div>
            {/* <div className="flex flex-row justify-center text-left py-4  h-fit ">
                welcome to&nbsp;<i>index</i> ! enter the curation contract you want to look up
            </div>    
            <div className="flex flex-row justify-center text-left  h-fit text-[12px]">
                <i>for testing purposes →&nbsp;
                    <a className="hover:underline" href="https://goerli.etherscan.io/address/0xe945f1a1671d6819bedbb9178aed41b11e8b83a8">
                        0xe945f1a1671d6819bedbb9178aed41b11e8b83a8
                    </a>
                </i>        
            </div>                           */}
        </div>
    )
}

export default CurationInput