// Contract details
const CONTRACT_ADDRESS = "0x70a4024183E9Bb3d5d4852bcBF3afe7F46Fd5cF3";
const MINT_PRICE = ethers.parseEther("1000000"); // 1M PLS
const MAX_SUPPLY = 9;
const BASE_URI = "https://ipfs.io/ipfs/bafybeic3sfsfzw6bnnd42c5qlfznlm5hweb3teuktzmbhciji6c2oxqxvy/";
const PULSECHAIN_CHAIN_ID = "0x171"; // PulseChain Mainnet Chain ID in hex (369)
const IPFS_GATEWAY = "https://purple-definite-marlin-730.mypinata.cloud/";

// ABI for the contract (only needed functions)
const abi = [
    "function mint(string memory tokenId) external payable",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function totalSupply() public view returns (uint256)"
];

let provider, signer, contract, account;

// Initialize wallet connection
async function initWallet() {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js not loaded!");
        document.getElementById("status").textContent = "Error: Ethers.js not loaded. Check your internet or browser console.";
        return;
    }

    const connectButton = document.getElementById("connectWallet");
    connectButton.addEventListener("click", () => connectWallet("metamask"));
    
    if (window.ethereum && window.ethereum.selectedAddress) {
        console.log("MetaMask already connected, auto-connecting...");
        await connectWallet("metamask");
    } else {
        console.log("MetaMask not auto-detected, waiting for user click.");
    }
}

async function ensurePulseChain() {
    if (!window.ethereum) {
        console.log("No Ethereum provider detected.");
        return false;
    }

    try {
        const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
        console.log("Current chain ID:", currentChainId);
        if (currentChainId !== PULSECHAIN_CHAIN_ID) {
            console.log("Switching to PulseChain...");
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: PULSECHAIN_CHAIN_ID }],
            });
            console.log("Switched to PulseChain.");
        }
        return true;
    } catch (switchError) {
        if (switchError.code === 4902) {
            console.log("PulseChain not found, adding it...");
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: PULSECHAIN_CHAIN_ID,
                        chainName: "PulseChain",
                        nativeCurrency: { name: "Pulse", symbol: "PLS", decimals: 18 },
                        rpcUrls: ["https://rpc.pulsechain.com"],
                        blockExplorerUrls: ["https://scan.pulsechain.com"]
                    }],
                });
                console.log("PulseChain added.");
                return true;
            } catch (addError) {
                console.error("Failed to add PulseChain:", addError);
                throw addError;
            }
        } else {
            console.error("Chain switch failed:", switchError);
            throw switchError;
        }
    }
}

async function connectWallet(preferredProvider = "metamask") {
    document.getElementById("status").textContent = "Connecting to wallet...";
    console.log("Attempting to connect with:", preferredProvider);

    try {
        if (preferredProvider === "metamask" && window.ethereum) {
            console.log("MetaMask detected:", window.ethereum);
            const chainReady = await ensurePulseChain();
            if (!chainReady) {
                throw new Error("Failed to set up PulseChain network.");
            }

            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            account = await signer.getAddress();
            console.log("MetaMask connected, account:", account);
        } else {
            console.log("Falling back to WalletConnect...");
            const wcProvider = new WalletConnectProvider({ qrcode: true });
            await wcProvider.enable();
            provider = new ethers.BrowserProvider(wcProvider);
            signer = await provider.getSigner();
            account = await signer.getAddress();
            console.log("WalletConnect connected, account:", account);
        }

        contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        document.getElementById("status").textContent = `Connected: ${account}. Loading NFTs...`;
        document.getElementById("connectWallet").style.display = "none";
        await loadNFTs();
    } catch (error) {
        console.error("Wallet connection failed:", error);
        let errorMsg = "Failed to connect wallet: ";
        if (error.code === 4001) {
            errorMsg += "User rejected the request.";
        } else if (!window.ethereum) {
            errorMsg += "MetaMask not detected. Install MetaMask or use WalletConnect.";
        } else {
            errorMsg += error.message || "Unknown error. Check console.";
        }
        document.getElementById("status").textContent = errorMsg;
    }
}

// Load NFT metadata and display
async function loadNFTs() {
    const gallery = document.getElementById("nftGallery");
    gallery.innerHTML = "";
    let loadedCount = 0;

    try {
        const totalSupply = await contract.totalSupply();
        console.log("Total supply:", totalSupply.toString());

        for (let i = 1; i <= MAX_SUPPLY; i++) {
            const tokenURI = `${BASE_URI}${i}.json`;
            try {
                const response = await fetch(tokenURI);
                const metadata = await response.json();

                const card = document.createElement("div");
                card.className = "nft-card";

                const img = document.createElement("img");

                // Check if the image field contains the IPFS protocol and replace it
                let imageSrc = metadata.image;
                if (imageSrc.startsWith("ipfs://")) {
                    imageSrc = imageSrc.replace("ipfs://", "ipfs/");
                }

                img.src = imageSrc.startsWith("http") ? imageSrc : `${IPFS_GATEWAY}${imageSrc}`;
                img.alt = metadata.name;

                const name = document.createElement("p");
                name.textContent = metadata.name;

                const price = document.createElement("p");
                price.textContent = "1 Million PLS";

                const button = document.createElement("button");
                button.textContent = i <= totalSupply ? "Minted" : "Mint";
                button.disabled = i <= totalSupply;
                button.addEventListener("click", () => mintNFT(i.toString()));

                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(price);
                card.appendChild(button);
                gallery.appendChild(card);
                loadedCount++;
            } catch (error) {
                console.error(`Failed to load NFT ${i}:`, error);
            }
        }

        document.getElementById("status").textContent = loadedCount > 0 
            ? `Connected: ${account}. ${loadedCount} NFTs loaded.` 
            : `Connected: ${account}. No NFTs loaded - check metadata or network.`;
    } catch (error) {
        console.error("Failed to fetch totalSupply:", error);
        document.getElementById("status").textContent = `Connected: ${account}. Failed to load NFTs - check network or contract.`;
    }
}


// Mint NFT
async function mintNFT(tokenId) {
    try {
        document.getElementById("status").textContent = "Minting in progress...";
        const tx = await contract.mint(tokenId, { value: MINT_PRICE });
        await tx.wait();
        document.getElementById("status").textContent = `NFT ${tokenId} minted successfully!`;
        await loadNFTs();
    } catch (error) {
        console.error("Minting failed:", error);
        document.getElementById("status").textContent = "Minting failed. Check console for details.";
    }
}

// Initialize on page load
window.addEventListener("load", () => {
    initWallet();
});

