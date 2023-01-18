import { Connection, clusterApiUrl, Keypair, PublicKey} from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage} from "@metaplex-foundation/js";
import React from "react"
import Head from "next/head"


function createConnection(
  url = "https://solana-mainnet.g.alchemy.com/v2/MYU7ftKNQdKKeDbXQwzk3kAJ6jgmbmfs"
) {
  return new Connection(url, {
    commitment: "processed",
    confirmTransactionInitialTimeout: 60000,
  });
}
const connection = createConnection();

const metaplex = Metaplex.make(connection)

export default function Home() {

  const [tokenId, setTokenId] = React.useState("")
  const [nft, setnft] = React.useState(null)
  
  const fetchNft = async () => {
    try {
    const mintAddress = new PublicKey(tokenId)
    const nftData = await metaplex.nfts().findByMint({ mintAddress })
    console.log(nftData)
    setnft(nftData)
    } catch (error) {
      alert(error)
    }
  }

  return ( 
    <div>
      <Head>
        <title>NFT Checker</title>
        <link rel="shortcut-icon" type="image/ico" href="./favicon.ico"></link>
      </Head>
      <div className="wrapper">

        <div className="header">
          <h1>Solana NFT Checker</h1>
        </div>

        <div className="form">
          <h2>Enter Your NFT Token Address:</h2>
          <input onChange={(event) => setTokenId(event.target.value)} type="text" />
          <button onClick={fetchNft}>Check NFT</button>
        </div>

        {nft && 
        <div className="nftCard">
            <img src={nft.json.image} height="200px" width="auto" alt="alt text"/>
            <h2>{nft.json.name}</h2>
            <p>{nft.json.description}</p>
            <a href={nft.json.external_url}>{nft.json.external_url}</a>
            <h2>Traits</h2>
            <div className="grid-container">
              {nft.json.attributes.map(item => <article key="item.trait_type" className="grid-item"><strong>{item.trait_type}:</strong>{item.value}</article>)}
            </div>
        </div>} 
        <p>Built By <a href="https://twitter.com/tomrso">Tomrso</a></p>
      </div>
    </div>
)}