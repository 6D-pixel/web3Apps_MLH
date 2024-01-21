import { Hero } from "./Heros/page";
import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";


export default function Home() {
  if (!process.env.MY_ACCOUNT_ID || !process.env.MY_PRIVATE_KEY) {
    throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
  }

  // create your client
  const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  return (
  <main className="">
    <Hero/>
    </main>);
}

