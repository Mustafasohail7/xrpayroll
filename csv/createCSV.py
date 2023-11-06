import csv

data = [
    ["fullName", "employeeID", "baseSalary", "currency", "department", "emailAddress", "xrpWalletAddress"],
    ["John", "123", "1010", "USD", "IT", "johndoe@email.com", "r38FxwxFG2Dmm2cCfZkcFMCS3YZTAU8EU9"],
    ["Jane", "456", "2000", "USD", "HR", "janedoe@email.com", "rHa1ycaBGPbuNdaC6fKwh5SYWsUvE4q6zj"],
    ["Austin", "789", "3000", "USD", "IT", "austinbutler@email.com", "rfxDyaqRe5p4n1uuWyJnPypUimKm4HPZd9"],
    ["Jenny", "101", "4000", "USD", "HR", "jennyfischer@email.com", "rN564zYsN7oHSBCZVFkwpwHqJyZ2zjWnA7"]
]

file_name = "mydata.csv"

with open(file_name, mode='w', newline='') as file:
    writer = csv.writer(file)
    for row in data:
        writer.writerow(row)
