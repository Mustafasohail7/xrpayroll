import './EmployeeList.css'

function EmployeeList({ employeeDataArray }) {
  // Group employees by department
  const employeesByDepartment = employeeDataArray.reduce((acc, employee) => {
    const { department } = employee;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(employee);
    return acc;
  }, {});



  return (
    <div className='employeeList-container'>
      <h2>Employee List by Department</h2>
      {Object.keys(employeesByDepartment).map((department) => (
        <div key={department} className='employeeList'>
          <h3>{department}</h3>
          <ul>
            {employeesByDepartment[department].map((employee, index) => {
                console.log(employee)
                return (
              <li key={index}><p>{employee.fullName}</p><p>({employee.baseSalary})</p><button>pay</button></li>
            )})}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
