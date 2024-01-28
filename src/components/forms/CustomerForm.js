import { useEffect, useState } from "react"
import "./Form.css"
import { getCustomerByUIserId, updateCustomer } from "../../services/customerService"
import { useNavigate } from "react-router-dom"


export const CustomerForm = ({ currentUser }) => {
    const [customer, setCustomer] = useState({})
    
    const navigate = useNavigate()

    useEffect(() => {
        getCustomerByUIserId(currentUser.id).then(data => {
            const customerObj = data[0]
            setCustomer(customerObj)
    })
}, [currentUser])

    const handleCustomerSave = (event) => {
        event.preventDefault()
        console.log("clicked!")

        const editedCustomer = {
            id: customer.id,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            userId: customer.userId,
        }

        updateCustomer(editedCustomer).then(() => {
           window.alert("Changes Made!")
            navigate(`/`)
        })
    }
    
    return (
        <form className="profile"> 
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group"></div>
                    <label>Address: </label>
                    <input
                        type="text"
                        value={customer.address}
                        onChange={(event) => {
                            const copy = { ...customer }
                            copy.address = event.target.value
                            setCustomer(copy)
                        }}
                        required
                        className="form-control"
                    />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label>Phone Number: </label>
                    <input
                        type="tel"
                        value={customer.phoneNumber}
                        onChange={(event) => {
                            const copy = { ...customer }
                            copy.phoneNumber = event.target.value
                            setCustomer(copy)
                        }}
                        required
                        className="form-control"
                    />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <button className="form-btn btn-primary" onClick={handleCustomerSave}>Save Profile</button>
            </fieldset>
        </form>
    )
}