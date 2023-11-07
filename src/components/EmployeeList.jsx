import './EmployeeList.css'

function EmployeeList({ employeeDataArray,wallet,setWallet,updateBalance}) {
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
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    const company_wallet = xrpl.Wallet.fromSeed(wallet.secret)
    const prepared = await client.autofill({
      "TransactionType": "Payment",
      "Account": wallet.address,
      "Amount": "1000000",
      "Destination": destination.toString(),
    })
    const signed = company_wallet.sign(prepared)
    const tx = await client.submitAndWait(signed.tx_blob)
    updateBalance()
    await client.disconnect()
  }

  const handleDepartmentPay = async () => {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  }

  return (
    <div className='employeeList-container'>
      <h2>Employee List by Department</h2>
      {Object.keys(employeesByDepartment).map((department) => (
        <div key={department} className='employeeList'>
          <div className='department-container'>
            <h3>{department}</h3>
            <button onClick={handleDepartmentPay}>pay</button>
          </div>
          <ul>
            {employeesByDepartment[department].map((employee, index) => {
                {/* console.log(employee) */}
                return (
              <li key={index}><p>{employee.fullName}</p><p>({employee.baseSalary})</p>
              <button onClick={handleEmployeePay}>pay</button></li>
            )})}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
