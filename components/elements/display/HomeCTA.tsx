// @ts-ignore

export default function HomeCTA({callback}) {

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
                <button onClick={()=>callback()} className="bg-black text-white w-full h-full">
                    read
                </button>
            </div>
        )
    }


    function ContractAddressInput() {
        return (
            <div className=" flex flex-row w-full h-full">
                <div className=" h-full flex flex-row items-center w-[65%] " >
                    contract address:
                </div>
                <input
                    className=" border-[1px] border-black w-full flex flex-row items-center"
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
            className="grid grid-cols-1 grid-rows-2 border-black text-[14px] w-[468px] h-fit"
        >
            <div className="text-center py-4  h-fit ">
                welcome to <i>reader</i> ! enter the contract address and the tokenid to render a markdown nft. note: if the nft is not a markdown file, reader will not render.
            </div>

            <div className=" text-center grid grid-cols-[2fr_1fr] grid-rows-1 h-fit space-x-2 w-full ">
                <InputContainer />
                <ButtonContainer />
            </div>
        </div>
    )
}