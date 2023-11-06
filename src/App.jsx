import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import Balance from './components/Balance'
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
    'EUR',
    'GBP',
    'XRP',
  ]

  const [employees, setEmployees] = useState([])
  const [wallet,setWallet] = useState({
    address: 'rNKGQUs3QqqnFnUDGkWEgaXAiT6iwQkBjg',
    secret: 'sEd7VBpaUz8MtuzX92VvPhN4pGBbxKa',
    balance: ''
  })
  
  return (
    <>
      <div className='employee-div'>
        <EmployeeForm departmentOptions={departmentOptions} currencyOptions={currencyOptions} 
        employees={employees} setEmployees={setEmployees}
        />
        <Balance wallet={wallet} setWallet={setWallet}/>
        <EmployeeList employeeDataArray={employees} wallet={wallet} setWallet={setWallet}/>
      </div>
    </>
  )
}

export default App
