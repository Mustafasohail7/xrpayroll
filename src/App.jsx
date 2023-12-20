import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import Balance from './components/Balance'
import Notification from './components/Notification'
import { useState } from 'react';
import './App.css'

function App() {

  const departmentOptions = [
    'HR',
    'Finance',
    'IT',
    'Sales',
    'Marketing',
    'Operations',
  ];

  const currencyOptions = [
    'USD',
    'XRP',
  ]

  const [message,setMessage] = useState('')
  const [employees, setEmployees] = useState([])
  const [wallet,setWallet] = useState({
    address: 'rNKGQUs3QqqnFnUDGkWEgaXAiT6iwQkBjg',
    secret: 'sEd7VBpaUz8MtuzX92VvPhN4pGBbxKa',
    balance: ''
  })
  const [date,setDate] = useState('')

  const updateBalance = async () => {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    setMessage('updating balance')
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
    setMessage('')
    await client.disconnect()
  }
  
  return (
    <>
      <div className='employee-div'>
        <EmployeeForm departmentOptions={departmentOptions} currencyOptions={currencyOptions} 
        employees={employees} setEmployees={setEmployees}
        />
        <Balance wallet={wallet} setWallet={setWallet} updateBalance={updateBalance}/>
        <EmployeeList employeeDataArray={employees} setEmployee={setEmployees} wallet={wallet} setWallet={setWallet} updateBalance={updateBalance} setMessage={setMessage}/>
        <Notification message={message}/>
      </div>
    </>
  )
}

export default App
