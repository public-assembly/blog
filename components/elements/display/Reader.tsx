import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore

export default function Reader({callback}) {

    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("100_Days.md")
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    return (
        <div
            className="relative top-[10%] grid grid-cols-[1fr_4fr_1fr] h-screen w-full"
        >
            <button onClick={()=>callback()} className="flex flex-row justify-self-start text-gray-400 hover:text-gray-700 h-fit w-full">
                {"< back"}
            </button>
            <div className="flex flex-row flex-wrap justify-self-center h-full">
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}