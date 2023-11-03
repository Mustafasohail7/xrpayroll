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
  
  

  return (
    <>
      <div className='employee-div'>
        <EmployeeForm departmentOptions={departmentOptions} currencyOptions={currencyOptions} 
        employees={employees} setEmployees={setEmployees}
        />
        <Balance employees={employees}/>
        <EmployeeList employeeDataArray={employees}/>
      </div>
    </>
  )
}

export default App
