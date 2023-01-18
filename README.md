<h1>Solana NFT Finder</h1>
This is a simple NFT finder built using Next.js, Metaplex and web3.js

To use the NFT finder you need to enter your Solana NFT's 'Token Address'. You can find that by checking Solscan.
When you press "Check NFT" your NFT details will show up all together. The details include: picture, name, description, website and traits.

<h2>How It Works</h2>
The whole code for the app lives in the index.tsx file.

The app is connected to Solana Mainnet via an "alchemy" route as when I was trying to use "mainnet-beta" RPC it returned a "403: access is denied error". It appears Solana mainnet-beta is locked down and rate-limited to avoid abuse. 

As you enter the "Token Address" the string is stored as state in tokenId using the onChange event listner.

Once the "Check NFT" button is clicked the fetchNFT function is called. This uses metaplex.nfts().findByMint and passes a public key (has to be created using new PublicKey(tokenId)) of the tokenId to locate the NFT you are searching for. **Note:** It appears that mintaddress and token address are used interchangably on Solana and are the same thing. I think this is because the 'mint address' is the initial address that the token has and therefor remains as the 'token address' - please correct me if I'm wrong.

Once we recive the NFT data it is stored in state as "nft", if you enter a Token Id that doesnt exist the app will throw an alert to let you know that it is incorrect.

The nft object can then be accessed throughout the app and used to display data. More on what you can get from an nft here: https://github.com/metaplex-foundation/js#the-nft-model

This was my first play using Solana and I love it. More apps to come with more funtionality. This will act as my notes if I need to remember how I did something and I will attach a detailed README to all of my apps.
