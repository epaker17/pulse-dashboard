// src/config.js
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

const pulseTestnet = {
  id: 943,
  name: "PulseChain Testnet v4",
  network: "pulsechain-testnet",
  nativeCurrency: {
    name: "tPLS",
    symbol: "tPLS",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.v4.testnet.pulsechain.com"] },
    public: { http: ["https://rpc.v4.testnet.pulsechain.com"] },
  },
  blockExplorers: {
    default: { name: "PulseScan", url: "https://scan.v4.testnet.pulsechain.com" },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: "PulseInvest Dashboard",
  projectId: "8aa5f8fc5e47cb5da2fd24a2342621bb",
  chains: [mainnet, pulseTestnet],
});
