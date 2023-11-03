import './Balance.css'
import { useEffect,useState } from 'react'

const Balance = () => {

    const [wallet,setWallet] = useState('')
    const [balance,setBalance] = useState('')

    const handleAccountCreation = async () => {
        console.log('clicked')
        // Create a wallet and fund it with the Testnet faucet:
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect()
        const fund_result = await client.fundWallet()
        const test_wallet = fund_result.wallet
        setWallet(test_wallet.address)
        setBalance(fund_result.balance)
        console.log(fund_result)
        await client.disconnect()
    }

    const checkBalance = async () => {
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect()
        console.log(client)
        await client.disconnect()
    }

    useEffect(() => {
        checkBalance()
    })
    
  return (
    <div>
      <button onClick={handleAccountCreation}>Create Wallet</button>
      <div>
        <label>Enter Already Existing Wallet Address</label>
        <input
            type='text'
            name='walletAddress'
            placeholder='Enter Wallet Address'
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
        />
      </div>
      <p>Balance: {balance}</p>
    </div>
  )
}

export default Balance
