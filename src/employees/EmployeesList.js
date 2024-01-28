import { useEffect, useState } from "react"
import "./Employees.css"
import { getStaffUsers } from "../services/userService"
import { User } from "../users/User"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]) 
    
    useEffect(() => {
        getStaffUsers().then((employeeArray) => {
           setEmployees(employeeArray)
       }) 
    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return (
                    <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
                        <User key={employeeObj.id} user={employeeObj} />
                    </Link>
                )
            })}
        </div>
    )
}
