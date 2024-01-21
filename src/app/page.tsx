'use client'
import { useContext } from "react";
import { Heros } from "./Heros";
import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { GlobalAppContext } from "@/contexts/GlobalAppContext";

export default function Home() {
  const { metamaskAccountAddress } = useContext(GlobalAppContext);

  if (!process.env.NEXT_PUBLIC_MY_ACCOUNT_ID || !process.env.NEXT_PUBLIC_MY_PRIVATE_KEY) {
    throw new Error(
      "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
    );
  }

  // create your client
  const myAccountId = AccountId.fromString(process.env.NEXT_PUBLIC_MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.NEXT_PUBLIC_MY_PRIVATE_KEY);

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  return (
    <main className="">
      <Heros />
    </main>
  );
}
