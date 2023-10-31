// EmployeeForm.js
import './EmployeeForm.css'

import { useState } from 'react';

function EmployeeForm({departmentOptions,currencyOptions,employees,setEmployees}) {
  // Define state variables to store employee data
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    employeeID: '',
    baseSalary: '',
    currency: '',
    department: '',
    emailAddress: '',
    xrpWalletAddress: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(employeeData)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    console.log('submitted')
    e.preventDefault();
    // Store the employeeData state in your application or display it elsewhere as needed
    const newEmployees = [...employees, employeeData]
    setEmployees(newEmployees)
    
    setEmployeeData({
        fullName: '',
        employeeID: '',
        baseSalary: '',
        currency: '',
        department: '',
        emailAddress: '',
        xrpWalletAddress: '',
    })
    // console.log(employees)
  };

  return (
    <div className='form-container'>
      <h2>Employee Information Form</h2>
      <form onSubmit={handleSubmit} className='form-div'>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={employeeData.fullName}
            onChange={handleInputChange}
            placeholder='Enter Employee Full Name'
            required
          />
        </div>
        <div>
          <label htmlFor="employeeID">Employee ID</label>
          <input
            type="text"
            name="employeeID"
            value={employeeData.employeeID}
            onChange={handleInputChange}
            placeholder='Enter Employee ID'
            required
          />
        </div>
        <div>
          <label htmlFor="baseSalary">Base Salary</label>
          <input
            type="text"
            name="baseSalary"
            value={employeeData.baseSalary}
            onChange={handleInputChange}
            placeholder='Enter Employee Base Salary'
            required
          />
          <select
            name='currency'
            value={employeeData.currency}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Currency</option>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
        <label htmlFor="department">Department</label>
            <select
                name="department"
                value={employeeData.department}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Department</option>
                {departmentOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={employeeData.emailAddress}
            onChange={handleInputChange}
            placeholder='Enter Employee Email Address'
            required
          />
        </div>
        <div>
          <label htmlFor="xrpWalletAddress">XRP Wallet Address</label>
          <input
            type="text"
            name="xrpWalletAddress"
            value={employeeData.xrpWalletAddress}
            onChange={handleInputChange}
            placeholder='Enter Employee XRP Wallet Address'
            required
          />
        </div>
        <button type="submit" className='submit-btn'>Add</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
