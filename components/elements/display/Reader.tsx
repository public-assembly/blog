import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from 'rich-markdown-editor';
// @ts-ignore

export default function Reader({callback, contentInput}) {

    const [content, setContent] = useState<string>("");


    return (
        <div
            className="font-times relative top-[10%] grid md:grid-cols-[1fr_4fr_1fr] h-screen w-full"
        >
            <button onClick={()=>callback()} className="hidden md:flex md:flex-row md:justify-self-start text-gray-400 hover:text-gray-700 h-fit w-full">
                {"< back"}
            </button>
            {contentInput? (
                <div className="px-2 md:flex md:flex-row md:flex-wrap md:justify-self-center h-full">
                    {/* <ReactMarkdown>
                        {contentInput}
                    </ReactMarkdown> */}
                    <Editor
                        disableExtensions={['container_notice']}
                        defaultValue={contentInput}
                        readOnly
                    />                    
                </div>
            ):(
                <div className="flex flex-row flex-wrap justify-self-center h-full">
                    {"Invalid Data. Go back and search again"}
                </div>
            )}
        </div>
    )
}