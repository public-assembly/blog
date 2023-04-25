import React, { MutableRefObject } from 'react';

type Props = {
  routeChange?: any,
  collectionOnChange?: any,
  collectionValue?: any,
  collectionName?: any,
} 

const Search: React.FC<Props> = ({routeChange, collectionOnChange, collectionValue, collectionName}: any) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          routeChange();
        }
      };
    
      return (
        <div className=" grid grid-cols-1 grid-rows-auto md:grid-rows-auto text-[14px] justify-center w-fit h-fit">
          <div className="flex flex-row items-end justify-center justify-self-center  h-full">
            <div className="flex flex-row h-full sm:min-w-[509px]">
              <div className="focus:outline-none outline-none relative rounded-[30px]  h-[40px] w-full flex flex-row items-center">
                <input
                  type="text"
                  name={collectionName}
                  value={collectionValue}
                  onChange={(e) =>
                    collectionOnChange((current: object) => {
                      return {
                        ...current,
                        collectionAddress: e.target.value,
                      };
                    })
                  }
                  onKeyDown={handleKeyDown}
                  className="outline-none focus:outline-none rounded-[30px] placeholder:text-[#9A9A9A] border-[#9f9f9f] p-t-3 pl-3 h-[40px] w-full flex flex-row items-center text-[16px]"
                />
                <img
                  className='hover:bg-gray-100 absolute right-3'
                  src={"./searchIcon.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    export default Search  


            {/* <div className="flex flex-row h-full w-fit ">
              <button
                onClick={() => routeChange()}
                className="rounded-r-[30px] border-t-[1px] border-r-[1px] border-b-[1px] border-black text-white w-[50px]  px-4 h-full"
              >
                <img
                className='hover:bg-gray-100'
                src={"./searchIcon.svg"}
                />                
              </button>
            </div> */}    