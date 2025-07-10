import React, { useState, useEffect } from "react";
import { useAccount, useChainId, useDisconnect, useBalance, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

// PINV TOKEN DETAILS
const PINV_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
];

const PINV_ADDRESS = "0x9cD66EB8b7280B5fcd0DF5bF3058ba5919Aa46a3";
const SUPPORTED_CHAIN_ID = 943;
const CHAIN_NAME = "PulseChain Testnet";

// --- MINIMALISTYCZNY, ESTETYCZNY PASEK CEN ---
function InfoBar() {
  const [prices, setPrices] = useState({
    BTC: null, ETH: null, PLS: null, HEX: null, PLSX: null,
  });

  useEffect(() => {
    async function fetchPrices() {
      try {
        const ids = [
          "bitcoin",         // BTC
          "ethereum",        // ETH
          "pulsechain",      // PLS
          "hex-pulsechain",  // HEX PulseChain
          "pulsex"           // PLSX
        ].join(",");
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
        const cgRes = await fetch(url);
        const cgData = await cgRes.json();

        setPrices({
          BTC: cgData.bitcoin?.usd ?? "-",
          ETH: cgData.ethereum?.usd ?? "-",
          PLS: cgData.pulsechain?.usd ?? "-",
          HEX: cgData["hex-pulsechain"]?.usd ?? "-",
          PLSX: cgData.pulsex?.usd ?? "-",
        });
      } catch {
        setPrices({
          BTC: "-", ETH: "-", PLS: "-", HEX: "-", PLSX: "-",
        });
      }
    }
    fetchPrices();
    const i = setInterval(fetchPrices, 60000);
    return () => clearInterval(i);
  }, []);

  const tokens = [
    { label: "BTC", icon: "BTC", value: prices.BTC },
    { label: "ETH", icon: "ETH", value: prices.ETH },
    { label: "PLS", icon: "PLS", value: prices.PLS },
    { label: "PLSX", icon: "PLSX", value: prices.PLSX },
    { label: "HEX", icon: "HEX", value: prices.HEX },
  ];

  // Minimalistyczny ticker, dwukrotnie, by zapętlić płynnie w kółko
  const tickerLine = (
    <>
      {tokens.map((item) => (
        <span key={item.label} style={{
          display: "inline-flex",
          alignItems: "center",
          marginRight: 38,
          color: "#61a5fb",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: 0.2,
          minWidth: 39,
          whiteSpace: "nowrap"
        }}>
          <span style={{ fontWeight: 700, marginRight: 2 }}>{item.icon}</span>
          <span style={{ color: "#4ed6ff", fontWeight: 700, marginLeft: 2 }}>
            {item.value === "-" ? "-" : Number(item.value).toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        background: "rgba(30,48,79,0.93)",
        borderRadius: 10,
        boxShadow: "0 1px 8px #0c14374d",
        marginBottom: 16,
        minHeight: 22,
        position: "relative",
        padding: 0,
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "tickerLoop 42s linear infinite",
        }}
      >
        {tickerLine}{tickerLine}
      </div>
      <style>{`
        @keyframes tickerLoop {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
// --- KONIEC INFOBAR ---

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  // PLS balance
  const { data: plsData, isLoading: plsLoading } = useBalance({
    address,
    chainId: SUPPORTED_CHAIN_ID,
    watch: true,
    enabled: !!address && chainId === SUPPORTED_CHAIN_ID,
  });

  // PINV decimals
  const { data: decimals } = useReadContract({
    address: PINV_ADDRESS,
    abi: PINV_ABI,
    functionName: "decimals",
    chainId: SUPPORTED_CHAIN_ID,
    enabled: !!address && chainId === SUPPORTED_CHAIN_ID,
  });

  // PINV symbol
  const { data: pinvSymbol } = useReadContract({
    address: PINV_ADDRESS,
    abi: PINV_ABI,
    functionName: "symbol",
    chainId: SUPPORTED_CHAIN_ID,
    enabled: !!address && chainId === SUPPORTED_CHAIN_ID,
  });

  // PINV balance
  const { data: pinvRaw, isLoading: pinvLoading } = useReadContract({
    address: PINV_ADDRESS,
    abi: PINV_ABI,
    functionName: "balanceOf",
    args: [address],
    chainId: SUPPORTED_CHAIN_ID,
    enabled: !!address && chainId === SUPPORTED_CHAIN_ID && !!decimals,
    watch: true,
  });

  // Format PINV balance
  let pinvBalance = "0";
  if (pinvRaw && decimals !== undefined) {
    try {
      pinvBalance = (
        Number(pinvRaw) / Math.pow(10, Number(decimals))
      ).toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch {
      pinvBalance = "0";
    }
  }

  return (
    <div
      style={{
        color: "#eaf6ff",
        maxWidth: 410,
        margin: "56px auto",
        background: "#19254b",
        borderRadius: 20,
        boxShadow: "0 2px 32px #1c3059a8",
        padding: 34,
        fontFamily: "Inter, Arial, sans-serif",
        border: "1px solid #203c62",
      }}
    >
      <InfoBar />
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <img
          src="/pinv-logo.png"
          alt="Pinv Logo"
          style={{
            width: 350,
            marginBottom: 8,
            marginTop: -18,
            filter: "drop-shadow(0 0 10px #41e0cc)",
          }}
        />
        <h2
          style={{
            margin: 0,
            color: "#61a5fb",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          PulseInvest Dashboard
        </h2>
      </div>
      {/* Connect Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <ConnectButton
          label="Połącz portfel MetaMask"
          accountStatus="avatar"
          showBalance={false}
        />
      </div>
      {/* Dane portfela */}
      {isConnected ? (
        chainId === SUPPORTED_CHAIN_ID ? (
          <div>
            <div
              style={{
                background: "#1b2d54",
                borderRadius: 12,
                margin: "10px 0 20px 0",
                padding: 16,
                boxShadow: "0 2px 8px #061b3760",
                fontSize: 16,
                display: "flex",
                flexDirection: "column",
                gap: 7,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#8bb3df" }}>Adres:</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#d0eaff",
                    letterSpacing: "0.5px",
                  }}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#8bb3df" }}>Sieć:</span>
                <span style={{ color: "#e7b847" }}>{CHAIN_NAME}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#8bb3df" }}>Saldo PLS:</span>
                <span style={{ color: "#4ed6ff", fontWeight: 600 }}>
                  {plsLoading
                    ? "..."
                    : plsData && plsData.formatted
                    ? plsData.formatted
                    : "0"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#8bb3df" }}>
                  Saldo {pinvSymbol || "PINV"}:
                </span>
                <span style={{ color: "#61a5fb", fontWeight: 600 }}>
                  {pinvLoading || decimals === undefined
                    ? "..."
                    : pinvBalance}
                </span>
              </div>
            </div>
            <button
              onClick={disconnect}
              style={{
                width: "100%",
                marginTop: 4,
                background: "#223fa7",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 0",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Odłącz portfel
            </button>
          </div>
        ) : (
          <div
            style={{
              marginTop: 14,
              textAlign: "center",
              color: "#fbb97c",
              fontSize: 16,
              fontWeight: 600,
              background: "#232842",
              borderRadius: 8,
              padding: 10,
            }}
          >
            Obsługiwany jest tylko <b>PulseChain Testnet</b>!<br />
            Zmień sieć w portfelu.
          </div>
        )
      ) : (
        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            color: "#c7deff",
            fontSize: 16,
            opacity: 0.8,
          }}
        >
          Połącz swój portfel MetaMask lub inny obsługiwany przez RainbowKit.
        </div>
      )}
      {/* Social buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          marginTop: 28,
        }}
      >
        <button
          onClick={() => window.open("https://x.com/PinvToken", "_blank")}
          style={{
            background: "#1da1f2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            transition: "0.15s",
          }}
        >
          <FaXTwitter size={22} />
          X / Twitter
        </button>
        <button
          onClick={() => window.open("https://t.me/PinvToken", "_blank")}
          style={{
            background: "#229ED9",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            transition: "0.15s",
          }}
        >
          <FaTelegramPlane size={22} />
          Telegram
        </button>
      </div>
      <div
        style={{
          color: "#375486",
          textAlign: "center",
          marginTop: 20,
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        PulseInvest 2025 &copy; All rights reserved.
      </div>
    </div>
  );
}
