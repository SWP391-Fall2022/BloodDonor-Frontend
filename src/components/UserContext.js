import { createContext } from "react";

const UserContext = createContext({ loggedIn: false });

function UserProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { UserContext, UserProvider }