import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const UserContext = createContext(
    {
        role: '',
        setAdmin: () => { },
        setDonor: () => { },
        setOrg: () => { },
        removeRole: () => { },
    }
)

function UserProvider({ children }) {
    const [userRole, setUserRole] = useState('')
    const setAdmin = () => {
        setUserRole("ADMIN")
    }
    const setDonor = () => {
        setUserRole("DONOR")
    }
    const setOrg = () => {
        setUserRole("ORGANIZATION")
    }
    const removeRole = () => {
        setUserRole("")
    }
    const role = userRole
    return (
        <UserContext.Provider value={{ role, setAdmin, setDonor, setOrg, removeRole }}>
            {children}
        </UserContext.Provider>
    )
}
export { UserProvider, UserContext }
