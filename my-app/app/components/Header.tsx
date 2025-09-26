// components/Header.tsx
import Image from "next/image";
import logo from "../public/logo.svg"; // replace with your SVG or PNG

export default function Header() {
  return (
    <header className="bg-[#F5F5F5] flex items-center justify-between px-6 h-20 shadow-sm relative text-lg font-bold">
      {/* Left buttons */}
      <div className="flex space-x-4">
        <button className="text-gray-700 hover:text-gray-900">
            <p className="hover:bg-black hover:text-white px-1">
                Shop
            </p>
        </button>
        <button className="text-gray-800">
            <p className="hover:bg-black hover:text-white px-1">
                About
            </p>
        </button>
      </div>

      {/* Center logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src='/logo.svg' alt="Logo" width={100} height={40} />
      </div>

      {/* Right buttons */}
      <div className="flex space-x-4">
        <button className="text-gray-700 hover:text-gray-900">
            <p className="hover:bg-black hover:text-white px-1">
                Contact
            </p>
        </button>
        <button className="text-gray-800">
            <p className="hover:bg-black hover:text-white px-1">
                Cart
            </p>
        </button>
      </div>
    </header>
  );
}
