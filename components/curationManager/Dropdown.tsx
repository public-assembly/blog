// @ts-nocheck
import { useState } from "react"

export const Dropdown = ({ title }: string) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-left text-lg mb-2 w-full focus:outline-none"
        >
          {title}
        </button>
        {isOpen && (
          <div className="bg-gray-100 p-4 rounded shadow">
            {/* Add dropdown content here */}
            <p>Content for {title} dropdown</p>
          </div>
        )}
      </div>
    );
  };

export default Dropdown