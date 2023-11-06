import './Balance.css'
import { useState } from 'react'

const Balance = ({wallet,setWallet}) => {

    const [seed,setSeed] = useState('')

    const handleAccountCreation = async () => {
        console.log('clicked')
        // Create a wallet and fund it with the Testnet faucet:
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect()
        const fund_result = await client.fundWallet()
        const test_wallet = fund_result.wallet
        setWallet({
          ...wallet,
          address: test_wallet.address,
          balance: test_wallet.balance
        })
        console.log(fund_result)
        await client.disconnect()
    }

    const checkBalance = async () => {
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect()
        const response = await client.request({
          "command": "account_info",
          "account": wallet.address,
          "ledger_index": "validated"
        })
        const test_balance = response.result.account_data.Balance
        setWallet({
          ...wallet,
          balance: test_balance
        })
        await client.disconnect()
    }

    const displayXrp = () => {
        const formattedBalance = wallet.balance / 1000000;
        const commaBalance = formattedBalance.toLocaleString(undefined, {
          minimumFractionDigits: 0, // Don't show decimal places
          maximumFractionDigits: 6, // Show up to 6 decimal places
        }) + " XRP";
        console.log(commaBalance)
        return commaBalance
    }

    console.log(wallet)
    
  return (
    <div className='balance-parent-div'>
    <div className='balance-container'>
      <button onClick={handleAccountCreation} className='create-wallet-btn'>Create a Wallet</button>
      <p style={{textAlign: 'center'}}>OR</p>
      <div className='wallet-address-form'>
        <label>Enter Already Existing Wallet Address</label>
        <input
            type='text'
            name='walletAddress'
            placeholder='Enter Wallet Address'
            value={wallet.address}
            onChange={(e) => setWallet({
                ...wallet,
                address: e.target.value
            })}
            className='wallet-address-input'
        />
        <button onClick={checkBalance} className='balance-btn'>Check Balance</button>
      </div>
      <p className='balance-text'>Balance: {displayXrp()}</p>
      <p>To obtain a wallet with more XRP, <a href='https://xrpl.org/xrp-testnet-faucet.html' target='_blank' className='faucet-link'>go here</a></p>
    </div>
    <div className='seed-container'>
      <div className='seed-store-form'>
        <label>Enter Account Seed Here To Allow Transactions</label>
        <input
            type='text'
            name='seed'
            placeholder='Enter Seed'
            className='seed-input'
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
        />
        <button onClick={
          () => {
            setWallet({
              ...wallet,
              secret: seed
            })
            setSeed('')
          }
        } className='save-seed-btn'>Save</button>
      </div>
    </div>
    </div>
  )
}

export default Balance
