import './EmployeeList.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';

function EmployeeList({ employeeDataArray,setEmployee,wallet,setWallet,updateBalance,setMessage}) {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month,setMonth] = useState((selectedDate.toLocaleString('default', { month: 'long' }))+'-'+selectedDate.getFullYear())

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDateChange = date => {
    setSelectedDate(date);
    setMonth((date.toLocaleString('default', { month: 'long' }))+'-'+date.getFullYear())
  };

  const addSalaryToEmployee = async (employee) => {
    console.log('working for',employee)
    const e = employeeDataArray.map((emp) => {
      if(emp.xrpWalletAddress === employee.xrpWalletAddress){
        return {
          ...emp,
          salary: [...emp.salary,month]
        }
      }
      // console.log('returning',emp)
      return emp
    })
    // console.log('checking e',e)
    setEmployee(e)
  }

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
    console.log('going to',destination)
    const employee = employeeDataArray.filter((employee) => employee.xrpWalletAddress === destination)
    if(employee[0].salary.includes(month)){
      setMessage('already paid')
      setTimeout(() => {
        setMessage('')
      },1000)
      return
    }
    if(employee[0].currency !== 'XRP'){
      setMessage('sending cross border payment')
      setTimeout(() => {
        setMessage('')
      },1000)
      await delay(1000)
      await findPath(destination,employee[0].baseSalary)
      return
    }
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    const company_wallet = xrpl.Wallet.fromSeed(wallet.secret)
    // setMessage('paying employee')
    setMessage(`paying ${employee[0].fullName}`)
    const amount = employee[0].baseSalary*1000000
    const prepared = await client.autofill({
      "TransactionType": "Payment",
      "Account": wallet.address,
      "Amount": amount.toString(),
      "Destination": destination.toString(),
    })
    const signed = company_wallet.sign(prepared)
    const tx = await client.submitAndWait(signed.tx_blob)
    await addSalaryToEmployee(employee[0])
    // console.log(employeeDataArray)
    updateBalance()
    setMessage('')
    await client.disconnect()
  }

  const handleDepartmentPay = async (department) => {
    console.log('paying department',department)
    for(var i=0;i<employeesByDepartment[department].length;i++){
      await handleEmployeePay(employeesByDepartment[department][i].xrpWalletAddress)
    }
    console.log('done paying dept')
  }

  const findPath = async (destination,amount) => {
    setMessage('finding path and paying')
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    const destination_account = destination
    const destination_amount = {
      value: amount,
      currency: 'USD',
      issuer: wallet.address,
    }
    const request = {
      command: 'ripple_path_find',
      source_account: wallet.address,
      source_currencies: [
        {
          currency: 'XRP',
        },
      ],
      destination_account,
      destination_amount,
    }

    const resp = await client.request(request)
    console.log("Ripple Path Find response: ", resp)

    const paths = resp.result.alternatives[0].paths_computed
    console.log("Computed paths: ", paths)

    const tx = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: destination_amount,
      Destination: destination_account,
      Paths: paths,
    }
    await client.autofill(tx)
    const signed = wallet.sign(tx)
    await addSalaryToEmployee(employeeDataArray.filter((employee) => employee.xrpWalletAddress === destination)[0])
    updateBalance()
    console.log('signed:', signed)
    await client.disconnect()
    setMessage('')
  }

  return (
    <div className='employeeList-container'>
      {/* <button onClick={findPath}>Check cross</button> */}
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
            {/* <button onClick={async ()=>{await handleDepartmentPay(department)}}
            disabled={employeesByDepartment[department].every((employee) => employee.salary.includes(month))}
            >pay</button> */}
          </div>
          <ul>
            {employeesByDepartment[department].map((employee, index) => {
                {/* console.log(employee) */}
                const use_employee = employeeDataArray.filter((emp) => emp.xrpWalletAddress === employee.xrpWalletAddress)[0]
                {/* console.log('use for',employee.fullName,use_employee) */}
                return (
              <li key={index}><p>{use_employee.fullName}</p>
              {use_employee.salary.includes(month) ? <p>paid</p> : <p>({use_employee.baseSalary})</p>}
              {/* <p>({employee.baseSalary})</p> */}
              <button onClick={async ()=> {await handleEmployeePay(use_employee.xrpWalletAddress)}}
              disabled={use_employee.salary.includes(month)}
              >pay</button>
              </li>
            )})}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
