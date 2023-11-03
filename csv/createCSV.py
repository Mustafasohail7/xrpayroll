import csv

data = [
    ["fullName", "employeeID", "baseSalary", "currency", "department", "emailAddress", "xrpWalletAddress"],
    ["John", "123", "1000", "USD", "IT", "johndoe@email.com", "123"],
    ["Jane", "456", "2000", "USD", "HR", "janedoe@email.com", "456"],
    ["Austin", "789", "3000", "USD", "IT", "austinbutler@email.com", "789"],
    ["Jenny", "101", "4000", "USD", "HR", "jennyfischer@email.com", "101"]
]

file_name = "mydata.csv"

with open(file_name, mode='w', newline='') as file:
    writer = csv.writer(file)
    for row in data:
        writer.writerow(row)
