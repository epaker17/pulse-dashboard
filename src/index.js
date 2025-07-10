import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { config } from "./wagmi";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const pulseMainnet = {
  id: 369,
  name: "PulseChain Mainnet",
  network: "pulsechain-mainnet",
  nativeCurrency: { name: "PLS", symbol: "PLS", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.pulsechain.com"] }, public: { http: ["https://rpc.pulsechain.com"] } },
  blockExplorers: { default: { name: "PulseScan", url: "https://scan.pulsechain.com" } },
  testnet: false,
};
const pulseTestnet = {
  id: 943,
  name: "PulseChain Testnet v4",
  network: "pulsechain-testnet",
  nativeCurrency: { name: "tPLS", symbol: "tPLS", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.v4.testnet.pulsechain.com"] }, public: { http: ["https://rpc.v4.testnet.pulsechain.com"] } },
  blockExplorers: { default: { name: "PulseScan", url: "https://scan.v4.testnet.pulsechain.com" } },
  testnet: true,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          chains={[pulseMainnet, pulseTestnet]}
          theme={darkTheme({ accentColor: "#61a5fb", borderRadius: "large", overlayBlur: "small" })}
        >
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
