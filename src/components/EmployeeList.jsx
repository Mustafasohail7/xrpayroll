import './EmployeeList.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';

function EmployeeList({ employeeDataArray,setEmployee,wallet,setWallet,updateBalance,setMessage}) {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month,setMonth] = useState((selectedDate.toLocaleString('default', { month: 'long' }))+'-'+selectedDate.getFullYear())

  const handleDateChange = date => {
    setSelectedDate(date);
    setMonth((date.toLocaleString('default', { month: 'long' }))+'-'+date.getFullYear())
  };

  // Group employees by department
  const employeesByDepartment = employeeDataArray.reduce((acc, employee) => {
    const { department } = employee;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(employee);
    return acc;
  }, {});

  const handleEmployeePay = async (destination) => {
    console.log(destination)
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    const company_wallet = xrpl.Wallet.fromSeed(wallet.secret)
    setMessage('paying employee')
    const prepared = await client.autofill({
      "TransactionType": "Payment",
      "Account": wallet.address,
      "Amount": "10000000",
      "Destination": destination.toString(),
    })
    const signed = company_wallet.sign(prepared)
    const tx = await client.submitAndWait(signed.tx_blob)
    setEmployee(employeeDataArray.map((employee) => {
      if(employee.xrpWalletAddress === destination){
        return {
          ...employee,
          salary: [...employee.salary,month]
        }
      }
      return employee
    }))
    updateBalance()
    setMessage('')
    await client.disconnect()
  }

  const handleDepartmentPay = async (department) => {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    setMessage('paying department')
    const company_wallet = xrpl.Wallet.fromSeed(wallet.secret)
    console.log('paying department',department)
    for(var i=0;i<employeesByDepartment[department].length;i++){
      const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "Amount": "10000000",
        "Destination": employeesByDepartment[department][i].xrpWalletAddress.toString(),
      })
      const signed = company_wallet.sign(prepared)
      const tx = await client.submitAndWait(signed.tx_blob)
      updateBalance()
    }
    console.log('done')
    setMessage('')
    await client.disconnect()
  }

  console.log(month)
  console.log(employeeDataArray)

  return (
    <div className='employeeList-container'>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        className='date-picker'
      />
      <h2>Employee List by Department</h2>
      {Object.keys(employeesByDepartment).map((department) => (
        <div key={department} className='employeeList'>
          <div className='department-container'>
            <h3>{department}</h3>
            <button onClick={()=>handleDepartmentPay(department)}>pay</button>
          </div>
          <ul>
            {employeesByDepartment[department].map((employee, index) => {
                {/* console.log(employee) */}
                return (
              <li key={index}><p>{employee.fullName}</p>
              {employee.salary.includes(month) ? <p>paid</p> : <p>({employee.baseSalary})</p>}
              {/* <p>({employee.baseSalary})</p> */}
              <button onClick={()=>handleEmployeePay(employee.xrpWalletAddress)}>pay</button></li>
            )})}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
