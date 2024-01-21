"use client";
import { useContext, useEffect, useState } from "react";
import { GlobalAppContext } from "@/contexts/GlobalAppContext";
import { connectToMetamask } from "@/lib/metamaskServices";

export const Navbar = () => {
  const { metamaskAccountAddress, setMetamaskAccountAddress } =
    useContext(GlobalAppContext);
  const [address,setAddress] = useState("")
  const retrieveWalletAddress = async () => {
    const addresses = await connectToMetamask();
    if (addresses) {
      // grab the first wallet address
      setMetamaskAccountAddress(addresses[0]);
      setAddress(addresses[0]);
      console.log(addresses[0]);
    }
  };

  return (
    <nav className="bg-blue-400 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="casino log"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Casino
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-black bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            onClick={retrieveWalletAddress}
          >
            {address === "" ? "Connect" : address}
          </button>
        </div>
      </div>
    </nav>
  );
};
