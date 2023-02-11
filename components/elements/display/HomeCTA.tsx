// @ts-ignore

export default function HomeCTA({pageStatus, collectionCallback, collectionState}) {

    function InputContainer() {
        return (
            <div className="cols-start-0 cols-end-1 row-start-0 row-end-1 flex flex-row flex-wrap h-fit gap-y-1 w-full">
                <ContractAddressInput />
                <TokenIdInput />
            </div>
        )
    }

    function ButtonContainer() {
        return (
            <div className="cols-start-1 cols-end-2 row-start-0 row-end-1 w-full">
                <button onClick={()=>pageStatus()} className="bg-black hover:bg-gray-900 text-white w-full h-full">
                    read
                </button>
            </div>
        )
    }

//     <input
//     className="text-black text-center bg-slate-200"
//     placeholder="Input NFT Address"
//     name="inputContract"
//     type="text"
//     value={dropInputs.salesConfig.presaleMerkleRoot}
//     onChange={(e) => {
//         e.preventDefault();
//         setDropInputs(current => {
//           return {
//             ...current,
//             salesConfig: {
//               ...current.salesConfig,
//               presaleMerkleRoot: e.target.value
//             }                        
//           }
//         })
//     }}
//     required                    
//   >
//   </input>
//   <button>

    function ContractAddressInput() {
        return (
            <div className=" flex flex-row w-full h-full">
                <div className=" h-full flex flex-row items-center w-[65%] " >
                    contract address:
                </div>
                <input
                    type="text"
                    value={collectionState.collectionAddress}
                    onChange={(e) => {
                        e.preventDefault();
                        collectionCallback((current: object) => {
                            return {
                                ...current,
                                collectionAddress: e.target.value                                             
                            }
                        })
                    }}                
                    className=" border-[1px] border-black w-full flex flex-row items-center text-sm"
                >
                </input>
            </div>
        )
    }

    function TokenIdInput() {
        return (
            <div className=" flex flex-row w-full h-full">
                <div className="h-full flex flex-row items-center w-[65%]" >
                    tokenid:
                </div>
                <input
                    className="border-[1px] border-black w-full flex flex-row items-center"
                >
                </input>
            </div>
        )
    }    

    return (
        <div
            className="grid grid-cols-1 grid-rows-2 text-[14px] w-[469px] h-fit"
        >
            <div className="text-center py-4  h-fit ">
                welcome to <i>reader</i> ! enter the contract address and the tokenid to render a markdown nft. note: if the nft is not a markdown file, reader will not render.
            </div>

            <div className="grid grid-cols-[2fr_1fr] grid-rows-1 space-x-1 h-fit  w-full ">
                <InputContainer />
                <ButtonContainer />
            </div>
        </div>
    )
}