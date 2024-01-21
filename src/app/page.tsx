"use client";
import { useContext } from "react";
import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { GlobalAppContext } from "@/contexts/GlobalAppContext";
import { sendHbar } from "@/lib/hederaServices";

export default function Home() {
  const { metamaskAccountAddress } = useContext(GlobalAppContext);

  if (
    !process.env.NEXT_PUBLIC_MY_ACCOUNT_ID ||
    !process.env.NEXT_PUBLIC_MY_PRIVATE_KEY
  ) {
    throw new Error(
      "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
    );
  }

  // create your client
  const myAccountId = AccountId.fromString(
    process.env.NEXT_PUBLIC_MY_ACCOUNT_ID
  );
  const myPrivateKey = PrivateKey.fromString(
    process.env.NEXT_PUBLIC_MY_PRIVATE_KEY
  );

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  return (
    <main className="">
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold mb-4">GiveAway Page</h1>
          <button
            type="button"
            className="py-3 my-4 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => {
              sendHbar(
                client,
                myAccountId,
                AccountId.fromEvmAddress(0, 0, metamaskAccountAddress),
                7,
                myPrivateKey
              );
            }}
          >
            Get your HBAR
          </button>
        </div>
      </section>
    </main>
  );
}
