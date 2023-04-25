export default function SearchSmall({routeChange, collectionOnChange, collectionValue}: any) {
    
    return (
        <div className="flex justify-center w-full">
            <div
                className=" grid grid-cols-1 grid-rows-auto md:grid-rows-auto text-[14px] justify-self-center w-fit h-full"
            >
                <div className="flex flex-row items-end  justify-center space-y-4 md:space-y-0 ">
                    <div className="flex flex-row h-full sm:w-[539px]">
                        <input
                            type="text"
                            value={collectionValue}
                            onChange={(e) => {
                                e.preventDefault();
                                collectionOnChange((current: object) => {
                                    return {
                                        ...current,
                                        collectionAddress: e.target.value,
                                    };
                                });
                            }}
                            className="rounded-l-[30px] placeholder:text-[#9A9A9A] p-t-3 pl-3 border-[1px] border-black h-fit w-full flex flex-row items-center text-[16px]"
                        ></input>
                    </div>
                    <div className="flex flex-row h-full w-fit justify-center">
                        <button onClick={() => routeChange()} className="rounded-r-[30px] border-t-[1px] border-r-[1px] border-b-[1px] border-black hover:bg-gray-100 text-white px-4 h-full">
                            🔍
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}