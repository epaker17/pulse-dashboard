import React from "react";

export default function Whitepaper() {
  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      background: "#172743",
      color: "#eaf6ff",
      borderRadius: 18,
      padding: 36,
      boxShadow: "0 4px 24px #1b335080",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <h1 style={{color:"#61a5fb"}}>PulseInvest (PINV) – Whitepaper</h1>
      <p style={{marginBottom: 24, color: "#7ec8ff", fontSize: 18}}>
        Version 1.0 – June 2025
      </p>

      <h2>1. Introduction</h2>
      <p>
        PulseInvest (PINV) is a decentralized, community-driven token launched on the PulseChain Testnet. Our mission is to build a secure, fair, and sustainable DeFi ecosystem that rewards true holders, discourages bots, and grows together with its community.
      </p>

      <h2>2. Key Features</h2>
      <ul>
        <li><strong>Fair Launch</strong>: No presale, no team allocation, 100% transparency.</li>
        <li><strong>Anti-Bot Protection</strong>: Ultra-high fee (99%) for the first 900 blocks (~30 minutes) after trading opens to eliminate sniping bots and ensure fair launch.</li>
        <li><strong>Simple, Fair Fee</strong>: After the anti-bot window, every transaction charges a fixed 3% fee (1.5% burned, 1.5% to the treasury).</li>
        <li><strong>Exemptions</strong>: Fees are automatically waived for treasury, owner, and the liquidity pool contract.</li>
        <li><strong>Holder Rewards</strong>: Future integration of a second token for rewarding PINV holders is planned.</li>
      </ul>

      <h2>3. Tokenomics</h2>
      <ul>
        <li><strong>Token Name:</strong> PulseInvest</li>
        <li><strong>Symbol:</strong> PINV</li>
        <li><strong>Chain:</strong> PulseChain Testnet</li>
        <li><strong>Total Supply:</strong> 21,000,000 PINV</li>
        <li><strong>Fee:</strong> 3% on each transaction (1.5% burned, 1.5% to treasury wallet)</li>
        <li><strong>Treasury Wallet:</strong> Used for project growth, rewards, and marketing</li>
        <li><strong>Anti-Bot Fee:</strong> 99% for first 900 blocks (~30 minutes)</li>
        <li><strong>Contract Verified:</strong> 100%, open-source, based on OpenZeppelin standards</li>
      </ul>

      <h2>4. Roadmap</h2>
      <ol>
        <li><b>Q2 2025</b> – Token launch on PulseChain Testnet, website & dashboard, anti-bot launch window</li>
        <li><b>Q3 2025</b> – Listing on PulseX DEX, community airdrop, launch of official staking & rewards program</li>
        <li><b>Q4 2025</b> – Integration of second reward token, DAO launch for decentralized governance, expansion to PulseChain Mainnet</li>
        <li><b>2026</b> – More Dapp features, external audits, cross-chain expansion, further ecosystem development</li>
      </ol>

      <h2>5. Security</h2>
      <ul>
        <li>Contract based on OpenZeppelin ERC20 & Ownable</li>
        <li>No mint function, fixed supply</li>
        <li>Anti-bot launch window with ultra-high fee</li>
        <li>Fee exemptions for LP and core wallets to protect user experience</li>
        <li>Planned external audits before mainnet launch</li>
      </ul>

      <h2>6. How To Buy and Use PINV?</h2>
      <ol>
        <li>Add PulseChain Testnet to your MetaMask wallet</li>
        <li>Get some PLS (testnet) from official PulseChain faucet</li>
        <li>Swap PLS to PINV on PulseX or directly via dashboard</li>
        <li>Hold PINV in your wallet to participate in future rewards</li>
      </ol>

      <h2>7. FAQ</h2>
      <ul>
        <li>
          <b>Q: What is the purpose of the 3% fee?</b><br/>
          A: It ensures sustainable project funding and increases value for holders by burning a portion of every transaction.
        </li>
        <li>
          <b>Q: Who pays the anti-bot fee?</b><br/>
          A: Only traders within the first ~30 minutes (900 blocks) after trading opens; after that, only the standard 3% fee applies.
        </li>
        <li>
          <b>Q: When will staking and rewards be launched?</b><br/>
          A: Planned for Q3 2025.
        </li>
        <li>
          <b>Q: Where can I see the contract?</b><br/>
          A: On PulseChain Testnet Explorer: <br/>
          <a style={{color:"#7ec8ff"}} href="https://scan.v4.testnet.pulsechain.com/address/0x44CD855cCEb3441FC50Fbe3A5356f5052e051FC4" target="_blank" rel="noopener noreferrer">
            0x44CD...51FC4
          </a>
        </li>
      </ul>

      <h2>8. Disclaimer</h2>
      <p>
        PulseInvest (PINV) is an experimental DeFi token on PulseChain Testnet. All users participate at their own risk. Please read the contract and whitepaper carefully before investing.
      </p>
      <p style={{marginTop:32, color:"#70c8ff", textAlign:"center"}}>
        PulseInvest 2025 &copy; All rights reserved.<br/>
        For support, join our Telegram or Discord community.
      </p>
    </div>
  );
}
