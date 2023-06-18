import React from 'react'

const WelcomeScreen = (props) => {  
  const { walletAddress, setWalletAddress, handleAddressSubmit, handleConnect } = props;
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Bazaar!</h1>
      <h2>Connect your wallet or enter an Ethereum address</h2>
      <form onSubmit={handleAddressSubmit}>
        <label aria-label='Wallet address' className="hidden" />
        <input id="address" name="address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="0x..." />
        <button type="submit">Submit address</button>
      </form>
      <p> - Or - </p>
      <button onClick={handleConnect}>Connect wallet</button>
    </div>
  )
}

export default WelcomeScreen