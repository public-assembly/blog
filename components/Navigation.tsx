// @ts-nocheck

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import SearchSmall from "./SearchSmall"
import Search from './Search'

const pages = [
  {
    slug: '/',
    title: 'index',
  },  
]

export function Navigation() {

  const router = useRouter()

  // state for determining what collection to search
  const [collection, setCollection] = useState({
    collectionAddress: router.query?.id, 
  });

  // change route function, passed in as callback to the search component
  const routeChange = () => {
      router.push({
          pathname: collection.collectionAddress
      })
  }  

  if (router.route == "/") {
    return (
      <nav className="text-[28px] flex flex-row w-full  h-fit items-start pr-[70px] justify-between">
        <div className=" flex flex-row h-fit">
          {pages.map((page) => (
            <Link passHref href={page.slug} key={page.slug}>
              <div
                className="hover:cursor-pointer leading-[45px]"
                style={{
                  fontWeight: router.asPath === page.slug ? 'normal' : 'normal',
                }}>
                {page.title}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    );    
  } else {
      return (
        <nav className="text-[28px] flex flex-row w-full  h-fit items-start pr-[70px] justify-between">
          <div className="flex flex-row h-fit">
            {pages.map((page) => (
              <Link passHref href={page.slug} key={page.slug}>
                <div
                  className="hover:cursor-pointer leading-[45px]"
                  style={{
                    fontWeight: router.asPath === page.slug ? 'normal' : 'normal',
                  }}>
                  {page.title}
                </div>
              </Link>
            ))}
          </div>
          {/* <SearchSmall routeChange={routeChange} collectionOnChange={setCollection} collectionValue={collection.collectionAddress} /> */}
          <div className="flex flex-row justify-center w-full">          
            <Search routeChange={routeChange} collectionOnChange={setCollection} collectionValue={collection.collectionAddress} collectionName={"collection"} />
          </div>
        </nav>
      );
  }
}
