import type { NextPage } from 'next'
import { Seo } from 'components'
import Frame from 'components/Reader/Frame';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  return (
    <>
      <section id="home-page" className=" flex flex-row justify-center h-screen">
        <Frame />
      </section>
      {/* <Seo/> */}
    </>
  )
}

export default Home
