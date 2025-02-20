# AureShame NFT Minting dApp

**Mint Here**: https://ipfs.io/ipfs/bafybeibq5xf33v3gxgbaizzg7uzkswqqahybha6wdrcj33vaz3w2fbcipq/

A frontend decentralized application (dApp) for minting exclusive AureShame NFTs ("ASHAME") on the PulseChain network. Only 9 unique NFTs exist in this highly exclusive collection!

## Overview

This is a simple, user-friendly web interface that allows users to:
- Connect their wallet (MetaMask or WalletConnect)
- View available AureShame NFTs
- Mint NFTs for 1 million PLS each
- Interact with the deployed smart contract on PulseChain

### Key Features
- **Limited Supply**: Only 9 NFTs in total
- **Cost**: 1,000,000 PLS per NFT
- **Network**: PulseChain Mainnet (Chain ID: 369)
- **IPFS Storage**: NFT metadata and images stored on IPFS via Pinata
- **Wallet Support**: MetaMask and WalletConnect integration

## Contract Details
- **Address**: `0x70a4024183E9Bb3d5d4852bcBF3afe7F46Fd5cF3`
- **Mint Price**: 1,000,000 PLS
- **Max Supply**: 9 NFTs
- **Base URI**: `https://ipfs.io/ipfs/bafybeic3sfsfzw6bnnd42c5qlfznlm5hweb3teuktzmbhciji6c2oxqxvy/`
- **IPFS Gateway**: `https://purple-definite-marlin-730.mypinata.cloud/`

## Prerequisites
- A web3-compatible wallet (e.g., MetaMask) with PulseChain configured
- Sufficient PLS in your wallet to cover minting costs (1M PLS per NFT + gas fees)
- PulseChain network added to your wallet (RPC: `https://rpc.pulsechain.com`, Chain ID: 369)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aureshame-nft-dapp.git
   cd aureshame-nft-dapp

   Here's a GitHub README for your AureShame NFT minting dApp based on the provided code:

```markdown
# AureShame NFT Minting dApp

A frontend decentralized application (dApp) for minting exclusive AureShame NFTs ("ASHAME") on the PulseChain network. Only 9 unique NFTs exist in this highly exclusive collection!

## Overview

This is a simple, user-friendly web interface that allows users to:
- Connect their wallet (MetaMask or WalletConnect)
- View available AureShame NFTs
- Mint NFTs for 1 million PLS each
- Interact with the deployed smart contract on PulseChain

### Key Features
- **Limited Supply**: Only 9 NFTs in total
- **Cost**: 1,000,000 PLS per NFT
- **Network**: PulseChain Mainnet (Chain ID: 369)
- **IPFS Storage**: NFT metadata and images stored on IPFS via Pinata
- **Wallet Support**: MetaMask and WalletConnect integration

## Contract Details
- **Address**: `0x70a4024183E9Bb3d5d4852bcBF3afe7F46Fd5cF3`
- **Mint Price**: 1,000,000 PLS
- **Max Supply**: 9 NFTs
- **Base URI**: `https://ipfs.io/ipfs/bafybeic3sfsfzw6bnnd42c5qlfznlm5hweb3teuktzmbhciji6c2oxqxvy/`
- **IPFS Gateway**: `https://purple-definite-marlin-730.mypinata.cloud/`

## Prerequisites
- A web3-compatible wallet (e.g., MetaMask) with PulseChain configured
- Sufficient PLS in your wallet to cover minting costs (1M PLS per NFT + gas fees)
- PulseChain network added to your wallet (RPC: `https://rpc.pulsechain.com`, Chain ID: 369)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ultradaylight/AureShame-NFT-Minting-dApp.git
   cd AureShame-NFT-Minting-dApp
   ```

2. Open `index.html` in a web browser or serve it locally:
   ```bash
   # Using a simple local server (e.g., with Python)
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

3. Ensure your wallet is connected to PulseChain and has sufficient PLS.

## Usage
1. Open the dApp in your browser.
2. Click "Connect Wallet" to link your MetaMask or WalletConnect wallet.
3. Browse the available NFTs in the gallery.
4. Click "Mint" on an available NFT to mint it (costs 1M PLS).
5. Confirm the transaction in your wallet.
6. Once minted, the button will update to "Minted" and the NFT will be yours!

## Project Structure
- **`index.html`**: The main frontend interface with styling
- **`app.js`**: Core logic for wallet connection, NFT loading, and minting
- **Dependencies**:
  - Ethers.js (v6.13.2) for Ethereum/PulseChain interaction
  - WalletConnect Web3 Provider (v2.10.0) for alternative wallet support

## Technical Details
- **Frontend**: Pure HTML/CSS/JavaScript, no frameworks
- **Blockchain Interaction**: Uses Ethers.js to interact with the PulseChain contract
- **NFT Metadata**: Fetched from IPFS, displayed dynamically
- **Error Handling**: Includes basic error messages for wallet connection and minting failures

## Contributing
Feel free to fork this repository and submit pull requests for improvements! Ideas:
- Add more detailed NFT metadata display
- Improve UI/UX with a modern framework (e.g., React)
- Enhance error handling and user feedback

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer
This is a decentralized application interacting with the PulseChain blockchain. Ensure you understand the risks of cryptocurrency transactions. The developers are not responsible for any financial losses.

---
Built by [UltraD](https://github.com/ultradaylight) | Powered by PulseChain
```


