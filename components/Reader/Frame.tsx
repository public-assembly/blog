import HomeCTA from "../elements/display/HomeCTA"
import Reader from "../elements/display/Reader"
import { useState } from "react"

export default function Frame() {

    const [siteStatus, setSiteStatus] = useState(0);

    console.log("siteStatus: ", siteStatus);

    const changeState = () => {
        if (siteStatus == 0) {
            setSiteStatus(1)
        } else {
            setSiteStatus(0)
        }
    }

    return (
        <section id="main-feed" className='text-[18px] grid grid-cols-1 h-screen w-[75%]  gap-4 justify-center'>
            {siteStatus == 0 ? (
                <div className="flex flex-row items-center justify-center ">
                    <HomeCTA callback={changeState} />
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center ">
                    <Reader callback={changeState} />
                </div>
            )}
        </section>
    )
}